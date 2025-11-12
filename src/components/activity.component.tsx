import CustomButtonComponent from '@/components/shared/custom.button.component';
import { CustomTextareaField } from '@/components/shared/text-field';
import { Icon } from '@iconify/react/dist/iconify.js';
import { formatDistanceToNow, subHours } from 'date-fns';
import React from 'react';
import CustomContainerComponent from './custom.container.component';
import { isEmpty } from 'lodash';

export interface ITimelineItem {
  id: number;
  type: 'comment' | 'activity';
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  content: string;
}

interface ActivityComponentProps {
  items: ITimelineItem[];
  onAddComment: (comment: string) => void;
}

const ActivityComponent = ({ onAddComment, items }: ActivityComponentProps) => {
  const [newComment, setNewComment] = React.useState('');

  const handlePostComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <CustomContainerComponent
      title="Comments & Activities"
      styles="bg-white"
      headerStyles="font-semibold text-lg text-gray-700"
    >
      <div className="grid lg:grid-cols-2 gap-6 items-start ">
        {/* Timeline items */}
        <div className="flex flex-col ">
          {isEmpty(items) ? (
            <div className=" text-gray-500">
              <p>No comments or activities....</p>
            </div>
          ) : (
            <>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex gap-x-4 pb-8 last:pb-0"
                >
                  {/* Vertical line */}
                  {index < items.length - 1 && (
                    <div className="absolute left-5 top-3 h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                  )}

                  {/* Dot */}
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <Icon
                      icon={
                        item.type === 'comment'
                          ? 'iconamoon:comment-light'
                          : 'fluent:document-text-24-regular'
                      }
                      className="h-4 w-4 text-gray-600 dark:text-gray-400"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{item.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(item.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mt-1 rounded-lg">
                      {item.type === 'activity' ? (
                        <p className="italic">{item.content}</p>
                      ) : item.type === 'comment' ? (
                        <div className="flex items-start gap-2 rounded-md bg-gray-50 p-3 dark:bg-default-100">
                          <Icon
                            icon="iconamoon:comment-dots-light"
                            className="mt-0.5 flex-shrink-0 text-lg"
                          />
                          <p>{item.content}</p>
                        </div>
                      ) : (
                        <p>{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Input for new comment */}
        <div className="flex flex-col gap-3 border-gray-200 dark:border-gray-700 sm:order-1">
          <CustomTextareaField
            placeholder="Type your comment here..."
            inputProps={{
              value: newComment,
              onChange(e) {
                setNewComment(e.target.value);
              },
            }}
          />
          <div className="flex justify-end ">
            <CustomButtonComponent
              style="w-[40%] h-[45px] bg-primary-cct text-white rounded-[6px]"
              label={'Post Comment'}
              disabled={!newComment.trim()}
              onclick={handlePostComment}
            />
          </div>
        </div>
      </div>
    </CustomContainerComponent>
  );
};

export default ActivityComponent;

const mockTimelineItems: ITimelineItem[] = [
  {
    id: 3,
    type: 'activity',
    user: { name: 'System' },
    timestamp: subHours(new Date(), 1).toISOString(),
    content: 'Requisition submitted for approval to Finance Department.',
  },
  {
    id: 2,
    type: 'comment',
    user: { name: 'Jane Smith' },
    timestamp: subHours(new Date(), 2).toISOString(),
    content:
      'Please prioritize the laptops, we need them for the new hires starting next week.',
  },
  {
    id: 1,
    type: 'activity',
    user: { name: 'John Doe' },
    timestamp: subHours(new Date(), 4).toISOString(),
    content: 'Created requisition.',
  },
];
