import React from 'react';
import { useNetwork } from 'wagmi';
import {
  FAIL_TX_STATUS,
  PENDING_TX_STATUS,
  SUCCESS_TX_STATUS,
  TransactionWithInfo,
} from '../../hooks/useTxHistory';
import { chainIdToExplorerLink } from '../../utils/chainIdToExplorerLink';
import { Box } from '../Box/Box';
import { DisconnectIcon } from '../Icons/Disconnect';
import { ExternalLinkIcon } from '../Icons/ExternalLink';
import { SpinnerIcon } from '../Icons/Spinner';
import { SuccessIcon } from '../Icons/Success';

import { Text } from '../Text/Text';

const getTxStatusIcon = (status: string) => {
  switch (status) {
    case PENDING_TX_STATUS:
      return SpinnerIcon;
    case SUCCESS_TX_STATUS:
      return SuccessIcon;
    case FAIL_TX_STATUS:
      return DisconnectIcon;
    default:
      return SpinnerIcon;
  }
};

interface TxProps {
  tx: TransactionWithInfo;
}

export function TxItem({ tx }: TxProps) {
  const Icon = getTxStatusIcon(tx.status);
  const iconColor =
    tx.status === FAIL_TX_STATUS
      ? 'error'
      : tx.status === SUCCESS_TX_STATUS
      ? 'connectionIndicator'
      : tx.status === PENDING_TX_STATUS
      ? 'accentColor'
      : 'menuTextAction';
  const [{ data: networkData }] = useNetwork();

  const confirmationStatus =
    tx.status === SUCCESS_TX_STATUS
      ? 'Completed'
      : tx.status === FAIL_TX_STATUS
      ? 'Failed'
      : 'Pending';
  return (
    <Box
      color="menuText"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      paddingX="8"
      paddingY="4"
    >
      <Box alignItems="center" display="flex" flexDirection="row" gap="14">
        <Box color={iconColor}>
          <Icon />
        </Box>
        <Box display="flex" flexDirection="column" gap="4">
          <Box>
            <Text color="modalText" font="body" size="14" weight="bold">
              {tx?.info}
            </Text>
          </Box>
          <Box>
            <Text
              color="modalTextSecondary"
              font="body"
              size="14"
              weight="medium"
            >
              {confirmationStatus}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        as="a"
        color="modalTextSecondary"
        href={`${chainIdToExplorerLink(networkData?.chain?.id)}tx/${tx.hash}`}
        rel="noreferrer"
        target="_blank"
        transform={{ active: 'shrink', hover: 'growLg' }}
        transition="default"
      >
        <ExternalLinkIcon />
      </Box>
    </Box>
  );
}
