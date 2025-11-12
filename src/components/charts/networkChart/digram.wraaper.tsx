/* eslint-disable @typescript-eslint/no-explicit-any */

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { useState, useCallback, useEffect } from 'react';

import { DiagramData } from '.';

interface DiagramProps {
	diagramData: DiagramData;
	onDiagramEvent: (e: go.DiagramEvent) => void;
	onModelChange: (e: go.IncrementalData) => void;
}

export function DiagramWrapper(props: DiagramProps) {
	const [diagram, setDiagram] = useState<go.Diagram | null>(null);

	const diagramRef = useCallback(
		(ref: ReactDiagram | null) => {
			if (ref != null) {
				setDiagram(ref.getDiagram());
				if (diagram instanceof go.Diagram) {
					diagram.addDiagramListener('ChangedSelection', props.onDiagramEvent);
				}
			}
		},
		[diagram, props.onDiagramEvent],
	);

	// Cleanup
	useEffect(() => {
		return () => {
			if (diagram instanceof go.Diagram) {
				diagram.removeDiagramListener('ChangedSelection', props.onDiagramEvent);
			}
		};
	}, [diagram, props.onDiagramEvent]);

	const initDiagram = (): go.Diagram => {
		const $ = go.GraphObject.make;
		// set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
		const diagram = $(go.Diagram, {
			'undoManager.isEnabled': false,
			'undoManager.maxHistoryLength': 1,

			layout: $(go.ForceDirectedLayout),
			model: $(go.GraphLinksModel, {
				linkKeyProperty: 'key',
				makeUniqueKeyFunction: (m: go.Model, data: any) => {
					let k = data.key || 1;
					while (m.findNodeDataForKey(k)) k++;
					data.key = k;
					return k;
				},
				// negative keys for links
				makeUniqueLinkKeyFunction: (m: go.GraphLinksModel, data: any) => {
					let k = data.key || -1;
					while (m.findLinkDataForKey(k)) k--;
					data.key = k;
					return k;
				},
			}),
		});

		// define a simple Node template
		diagram.nodeTemplate = $(
			go.Node,
			'Auto', // the Shape will go around the TextBlock
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
				go.Point.stringify,
			),
			{ selectable: false },
			$(
				go.Shape,
				'RoundedRectangle',
				{
					name: 'SHAPE',
					fill: 'white',
					strokeWidth: 0,
					// set the port properties:
					portId: '',
					fromLinkable: false,
					toLinkable: false,
					cursor: 'pointer',
				},
				// Shape.fill is bound to Node.data.color
				new go.Binding('fill', 'color'),
			),
			$(
				go.TextBlock,
				{ margin: 8, editable: false, font: '400 .775rem Roboto, sans-serif' }, // some room around the text
				new go.Binding('text').makeTwoWay(),
			),
		);

		// relinking depends on modelData
		diagram.linkTemplate = $(
			go.Link,
			new go.Binding('relinkableFrom', 'canRelink').ofModel(),
			new go.Binding('relinkableTo', 'canRelink').ofModel(),
			$(go.Shape, {
				toArrow: 'standard',
				strokeWidth: 0,
				fill: '#929192',
			}),
			$(go.Shape, {
				isPanelMain: true,
				strokeWidth: 2,
				stroke: '#929192',
			}),
		);

		diagram.initialScale = 0.75;

		return diagram;
	};

	return (
		<ReactDiagram
			ref={diagramRef}
			divClassName="w-full h-[510px] overflow-hidden scrollbar-hide "
			initDiagram={initDiagram}
			nodeDataArray={props.diagramData.nodeDataArray}
			linkDataArray={props.diagramData.linkDataArray}
			modelData={props.diagramData.modelData}
			onModelChange={props.onModelChange}
			skipsDiagramUpdate={props.diagramData.skipsDiagramUpdate}
		/>
	);
}
