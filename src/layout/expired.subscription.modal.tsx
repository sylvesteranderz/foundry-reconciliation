import { CustomDropdown } from '@/components/custom.dropdown';
import CustomModal from '@/components/shared/modal';
import useMutateApi from '@/hooks/useMutateApi';
import useQueryApi from '@/hooks/useQueryApi';
import { RootState } from '@/store/store';
import { variables } from '@/utils/env';
import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector } from 'react-redux';
import { IOrganzationList } from './main.sidebar';

interface IExpiredSubscriptionModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ExpiredSubscriptionModal = ({
  isOpen,
  onOpenChange,
}: IExpiredSubscriptionModal) => {
  const auth = useAuth0();
  const { userInfo, organization } = useSelector(
    (state: RootState) => state.auth
  );

  const { data } = useQueryApi({
    key: ['organization-list'],
    url: variables().BASE_URL + '/a89/organization/list',
    params: { full_query: false, uid: userInfo.id },
  });

  const organization_list = data
    ?.filter((i: IOrganzationList) => ['banking'].includes(i.sector))
    ?.map((i: IOrganzationList) => ({
      label: i.name,
      key: i.id,
    }));

  const switch_organizations = organization_list?.length > 1;

  const { mutate: onSwitchSession } = useMutateApi({
    key: ['switch session'],
    url: variables().BASE_URL + '/auth/switch-session',
    async onSuccess() {
      auth.logout({ logoutParams: { returnTo: window.location.origin } });
    },
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      header={''}
      body={
        <div className="pb-8 text-center flex flex-col items-center">
          <div className="w-[4rem] h-[4rem] bg-red-500/20 rounded-full grid place-items-center mb-4">
            <div className="w-[3rem] h-[3rem] bg-red-500/40 rounded-full grid place-items-center">
              <div className="w-[2rem] h-[2rem] bg-red-500/60 rounded-full grid place-items-center">
                <Icon
                  icon="ci:warning"
                  width="24"
                  height="24"
                  className="text-white"
                />
              </div>
            </div>
          </div>
          <p>
            Your subscription has expired, and access to premium features is now
            unavailable. To continue enjoying full benefits, please renew your
            subscription.
          </p>
        </div>
      }
      placement="top"
      size="xl"
      classNames={{ closeButton: 'hidden' }}
      footer={
        <div className="w-2/3 mx-auto">
          {switch_organizations && (
            <CustomDropdown
              options={organization_list || []}
              label={
                organization_list?.find((i: any) => i.key === organization?.id)
                  ?.label || ' '
              }
              value={organization?.id}
              onclick={function (key: React.Key): void {
                onSwitchSession({ oid: key });
              }}
              style="text-left px-0 bg-gray-100"
            />
          )}
        </div>
      }
    />
  );
};

export default ExpiredSubscriptionModal;
