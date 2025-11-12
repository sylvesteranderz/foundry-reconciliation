/* eslint-disable @typescript-eslint/no-explicit-any */

import * as go from 'gojs';

import { useEffect, useState, useCallback } from 'react';
import { useImmer } from 'use-immer';

import { DiagramWrapper } from './digram.wraaper';

export type DiagramData = {
	nodeDataArray: Array<go.ObjectData>;
	linkDataArray: Array<go.ObjectData>;
	modelData: go.ObjectData;
	selectedData: go.ObjectData | null;
	skipsDiagramUpdate: boolean;
};

interface GoJsChartProps {
	data: DiagramData;
}
export function GoJsChart(props: GoJsChartProps) {
	// Maps to store key -> arr index for quick lookups
	const [mapNodeKeyIdx, setMapNodeKeyIdx] = useState<Map<go.Key, number>>(
		new Map<go.Key, number>(),
	);
	const [mapLinkKeyIdx, setMapLinkKeyIdx] = useState<Map<go.Key, number>>(
		new Map<go.Key, number>(),
	);

	const [diagram, updateDiagram] = useImmer<DiagramData>(props.data);

	const refreshNodeIndex = useCallback((nodeArr: Array<go.ObjectData>) => {
		const newMapNodeKeyIdx: Map<go.Key, number> = new Map<go.Key, number>();
		nodeArr.forEach((n: go.ObjectData, idx: number) => {
			newMapNodeKeyIdx.set(n.key, idx);
		});
		setMapNodeKeyIdx(newMapNodeKeyIdx);
	}, []);

	const refreshLinkIndex = useCallback((linkArr: Array<go.ObjectData>) => {
		const newMapLinkKeyIdx: Map<go.Key, number> = new Map<go.Key, number>();
		linkArr.forEach((l: go.ObjectData, idx: number) => {
			newMapLinkKeyIdx.set(l.key, idx);
		});
		setMapLinkKeyIdx(newMapLinkKeyIdx);
	}, []);

	const handleDiagramEvent = (e: go.DiagramEvent) => {
		const name = e.name;
		switch (name) {
			case 'ChangedSelection': {
				const sel = e.subject.first();
				updateDiagram((draft: DiagramData) => {
					if (sel) {
						if (sel instanceof go.Node) {
							const idx = mapNodeKeyIdx.get(sel.key);
							if (idx !== undefined && idx >= 0) {
								const nd = draft.nodeDataArray[idx];
								draft.selectedData = nd;
							}
						} else if (sel instanceof go.Link) {
							const idx = mapLinkKeyIdx.get(sel.key);
							if (idx !== undefined && idx >= 0) {
								const ld = draft.linkDataArray[idx];
								draft.selectedData = ld;
							}
						}
					} else {
						draft.selectedData = null;
					}
				});
				break;
			}
			default:
				break;
		}
	};

	/**
	 * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
	 * This method iterates over those changes and updates state to keep in sync with the GoJS model.
	 * @param obj a JSON-formatted string
	 */
	const handleModelChange = (obj: go.IncrementalData) => {
		const insertedNodeKeys = obj.insertedNodeKeys;
		const modifiedNodeData = obj.modifiedNodeData;
		const removedNodeKeys = obj.removedNodeKeys;
		const insertedLinkKeys = obj.insertedLinkKeys;
		const modifiedLinkData = obj.modifiedLinkData;
		const removedLinkKeys = obj.removedLinkKeys;
		const modifiedModelData = obj.modelData;

		// maintain maps of modified data so insertions don't need slow lookups
		const modifiedNodeMap = new Map<go.Key, go.ObjectData>();
		const modifiedLinkMap = new Map<go.Key, go.ObjectData>();
		updateDiagram((draft: DiagramData) => {
			let narr = draft.nodeDataArray;
			if (modifiedNodeData) {
				modifiedNodeData.forEach((nd: go.ObjectData) => {
					modifiedNodeMap.set(nd.key, nd);
					const idx = mapNodeKeyIdx.get(nd.key);
					if (idx !== undefined && idx >= 0) {
						narr[idx] = nd;
						if (draft.selectedData && draft.selectedData.key === nd.key) {
							draft.selectedData = nd;
						}
					}
				});
			}
			if (insertedNodeKeys) {
				insertedNodeKeys.forEach((key: go.Key) => {
					const nd = modifiedNodeMap.get(key);
					const idx = mapNodeKeyIdx.get(key);
					if (nd && idx === undefined) {
						// nodes won't be added if they already exist
						mapNodeKeyIdx.set(nd.key, narr.length);
						narr.push(nd);
					}
				});
			}
			if (removedNodeKeys) {
				narr = narr.filter((nd: go.ObjectData) => {
					if (removedNodeKeys.includes(nd.key)) {
						return false;
					}
					return true;
				});
				draft.nodeDataArray = narr;
				refreshNodeIndex(narr);
			}

			let larr = draft.linkDataArray;
			if (modifiedLinkData) {
				modifiedLinkData.forEach((ld: go.ObjectData) => {
					modifiedLinkMap.set(ld.key, ld);
					const idx = mapLinkKeyIdx.get(ld.key);
					if (idx !== undefined && idx >= 0) {
						larr[idx] = ld;
						if (draft.selectedData && draft.selectedData.key === ld.key) {
							draft.selectedData = ld;
						}
					}
				});
			}
			if (insertedLinkKeys) {
				insertedLinkKeys.forEach((key: go.Key) => {
					const ld = modifiedLinkMap.get(key);
					const idx = mapLinkKeyIdx.get(key);
					if (ld && idx === undefined) {
						// links won't be added if they already exist
						mapLinkKeyIdx.set(ld.key, larr.length);
						larr.push(ld);
					}
				});
			}
			if (removedLinkKeys) {
				larr = larr.filter((ld: go.ObjectData) => {
					if (removedLinkKeys.includes(ld.key)) {
						return false;
					}
					return true;
				});
				draft.linkDataArray = larr;
				refreshLinkIndex(larr);
			}
			// handle model data changes, for now just replacing with the supplied object
			if (modifiedModelData) {
				draft.modelData = modifiedModelData;
			}
			draft.skipsDiagramUpdate = true;
		});
	};

	useEffect(() => {
		refreshNodeIndex(diagram.nodeDataArray);
		refreshLinkIndex(diagram.linkDataArray);
	}, [
		refreshNodeIndex,
		refreshLinkIndex,
		diagram.nodeDataArray,
		diagram.linkDataArray,
	]);

	return (
		<div>
			<DiagramWrapper
				diagramData={diagram}
				onDiagramEvent={handleDiagramEvent}
				onModelChange={handleModelChange}
			/>
		</div>
	);
}
