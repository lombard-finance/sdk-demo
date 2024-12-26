import { FormControlLabel, Typography } from '@mui/material';

import { TERMS_OF_SERVICE_LINK } from 'modules/auth/const';
import { Checkbox } from 'modules/common/components/Checkbox';
import { useTranslation } from 'modules/i18n';
import { useState } from 'react';
import { ConnectDialog } from './components/ConnectDialog';
import { ConnectDialogButtons } from './components/ConnectDialog/ConnectDialogButtons';
import { ConnectDialogTitle } from './components/ConnectDialog/ConnectDialogTitle';
import { ConnectMetamask } from './components/ConnectMetamask';
import { ConnectOKX } from './components/ConnectOKX';
import { translation } from './translation';

interface IConnectionModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export function ConnectionModal({
  isOpened,
  onClose,
}: IConnectionModalProps): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const isConnectDisabled = !checked;

  return (
    <ConnectDialog open={isOpened} onClose={onClose}>
      <ConnectDialogTitle
        title={t(keys.title)}
        description={t(keys.description)}
      />

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
        label={
          <Typography variant="body2">
            {t(keys.tosText, { link: TERMS_OF_SERVICE_LINK }, true)}
          </Typography>
        }
        sx={{ mb: 2 }}
      />

      <ConnectDialogButtons>
        <ConnectMetamask isDisabled={isConnectDisabled} onSuccess={onClose} />

        <ConnectOKX isDisabled={isConnectDisabled} onSuccess={onClose} />
      </ConnectDialogButtons>
    </ConnectDialog>
  );
}
