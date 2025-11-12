import { cn } from '@/lib/utils';
import { Tab, Tabs } from '@nextui-org/react';
import { FC, ReactElement } from 'react';

interface TabsComponentProps {
  tabItems: {
    title: string;
    component: ReactElement;
  }[];
  cursorClass?: string;
  tabContentClass?: string;
  baseClass?: string;
  tabClass?: string;
  selected?: string;
  childClass?: string;
  onSelectionChange?: (key: any) => any;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({
  tabItems,
  cursorClass,
  tabContentClass,
  baseClass,
  tabClass,
  selected,
  childClass,
  onSelectionChange,
}) => {
  return (
    <Tabs
      aria-label="Options"
      variant="underlined"
      selectedKey={selected}
      onSelectionChange={onSelectionChange}
      classNames={{
        base: cn('relative flex flex-col', baseClass),
        tabList: 'gap-5 w-full relative rounded-none p-0',
        cursor: cn(`w-full bg-primary-cct rounded-full h-[2px]`, cursorClass),
        tab: cn('max-w-fit text-[14px] px-0', tabClass),
        tabContent: cn(
          'dark:group-data-[selected=true]:text-primary-cct group-data-[selected=true]:text-primary-cct w-full dark:text-[#f5f5f5]',
          tabContentClass
        ),
      }}
    >
      {tabItems?.map((i) => (
        <Tab key={i.title} title={i.title} className="h-full">
          <div className={cn('w-full h-[600px]', childClass)}>
            {i.component}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
};

interface TabsTopUnderlineProps {
  selectedKey: React.Key;
  onSelectionChange: React.Dispatch<React.SetStateAction<React.Key>>;
  ItemsArray: string[];
}

export const TabsTopUnderline: FC<TabsTopUnderlineProps> = ({
  ItemsArray,
  selectedKey,
  onSelectionChange,
}) => {
  return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none p-0 -mt-2',
            cursor:
              'w-full bg-[#ff8a50] dark:bg-[#619B7D]  absolute rounded-full top-0',
            tab: 'max-w-fit px-0',
            tabContent:
              'dark:group-data-[selected=true]:text-[#619B7D] group-data-[selected=true]:text-[#ff8a50] w-full dark:text-[#f5f5f5]',
          }}
          selectedKey={selectedKey as any}
          onSelectionChange={onSelectionChange}
        >
          {ItemsArray.map((file) => (
            <Tab
              key={file}
              title={
                <div className="flex items-center space-x-2">
                  <span>{file}</span>
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
};
