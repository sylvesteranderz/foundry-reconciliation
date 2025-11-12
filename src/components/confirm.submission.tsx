import CustomButtonComponent from './shared/custom.button.component';
import CustomModal from './shared/modal';

type IConfirmSubmission = {
  isOpen: boolean;
  onOpenChange: () => void;
  target?: string;
  onProceed: () => void;
};

export default function ConfirmSubmission({
  isOpen,
  onOpenChange,
  target,
  onProceed,
}: IConfirmSubmission) {
  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header={<p className='text-[15px]'>Confirm Submission</p>}
      placement="top"
      body={
        <div className="flex flex-col text-center my-4">
          Are you sure you want to submit this {target} request?
        </div>
      }
      footer={
        <div className="w-full grid grid-cols-1">
          <CustomButtonComponent
            label={'Submit'}
            onclick={function (): void {
              onProceed();
              onOpenChange();
            }}
          />
        </div>
      }
    />
  );
}
