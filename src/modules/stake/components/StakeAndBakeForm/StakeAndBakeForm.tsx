import { Card, CardContent, Stack } from '@mui/material';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { STAKE_AND_BAKE_STATES, StakeAndBakeState } from '../../const';
import { useStakeAndBakeForm } from '../../hooks/useStakeAndBakeForm';
import { isEthereumChain } from '../../utils/isEthereumChain';
import { FormConnectionGuard } from '../StakeForm/components/FormConnectionGuard';
import { AuthorizationView } from './components/AuthorizationView';
import { ConfirmationView } from './components/ConfirmationView';
import { DefaultView } from './components/DefaultView';
import { NetworkFeeView } from './components/NetworkFeeView';
import { ReadyView } from './components/ReadyView';

export const StakeAndBakeForm = () => {
  const [formState, setFormState] = useState<StakeAndBakeState>(
    STAKE_AND_BAKE_STATES.DEFAULT,
  );
  const {
    methods,
    handleSubmit,
    onSubmit,
    chain,
    minAmount,
    selectedProtocol,
    isCustomProtocol,
    amount,
    captchaToken,
    stakeAndBakeSignature,
    networkFeeSignature,
    protocol,
    handleStakeAndBakeAuthorize,
  } = useStakeAndBakeForm();

  const handleStateTransition = async (data: any) => {
    const isEthereum = isEthereumChain(chain);
    const hasValidNetworkFee = !isEthereum || networkFeeSignature?.hasSignature;
    const hasValidStakeAndBake = stakeAndBakeSignature?.signature;

    // If we have all required signatures, go to ready state
    if (hasValidNetworkFee && hasValidStakeAndBake) {
      setFormState(STAKE_AND_BAKE_STATES.READY);
      return;
    }

    switch (formState) {
      case STAKE_AND_BAKE_STATES.DEFAULT:
        if (isEthereum && !networkFeeSignature?.hasSignature) {
          setFormState(STAKE_AND_BAKE_STATES.NETWORK_FEE);
        } else {
          setFormState(STAKE_AND_BAKE_STATES.CONFIRMATION);
        }
        break;

      case STAKE_AND_BAKE_STATES.NETWORK_FEE:
        await onSubmit({ ...data, step: 'networkFee' });
        setFormState(STAKE_AND_BAKE_STATES.CONFIRMATION);
        break;

      case STAKE_AND_BAKE_STATES.CONFIRMATION:
        setFormState(STAKE_AND_BAKE_STATES.AUTHORIZATION);
        break;

      case STAKE_AND_BAKE_STATES.AUTHORIZATION:
        await onSubmit({ ...data, step: 'authorization' });
        setFormState(STAKE_AND_BAKE_STATES.READY);
        break;

      default:
        break;
    }
  };

  const renderFormStep = () => {
    // If we have all required signatures, show ready state
    const isEthereum = isEthereumChain(chain);
    const hasValidNetworkFee = !isEthereum || networkFeeSignature?.hasSignature;
    const hasValidStakeAndBake = stakeAndBakeSignature?.signature;

    if (
      formState === STAKE_AND_BAKE_STATES.READY ||
      (hasValidNetworkFee && hasValidStakeAndBake)
    ) {
      return (
        <ReadyView
          methods={methods}
          handleStakeAndBakeAuthorize={handleStakeAndBakeAuthorize}
          minAmount={minAmount}
          networkFeeSignature={networkFeeSignature}
          stakeAndBakeSignature={stakeAndBakeSignature}
          amount={amount}
          chain={chain}
        />
      );
    }

    switch (formState) {
      case STAKE_AND_BAKE_STATES.NETWORK_FEE:
        return (
          <NetworkFeeView
            onBackClick={() => setFormState(STAKE_AND_BAKE_STATES.DEFAULT)}
            chain={chain}
          />
        );

      case STAKE_AND_BAKE_STATES.CONFIRMATION:
        return (
          <ConfirmationView
            onBackClick={() => setFormState(STAKE_AND_BAKE_STATES.DEFAULT)}
            chain={chain}
            protocol={protocol}
          />
        );

      case STAKE_AND_BAKE_STATES.AUTHORIZATION:
        return (
          <AuthorizationView
            onBackClick={() => setFormState(STAKE_AND_BAKE_STATES.DEFAULT)}
            amount={amount}
            chain={chain}
            captchaToken={captchaToken}
            stakeAndBakeSignature={stakeAndBakeSignature}
          />
        );

      default:
        return (
          <DefaultView
            methods={methods}
            chain={chain}
            minAmount={minAmount}
            selectedProtocol={selectedProtocol}
            isCustomProtocol={isCustomProtocol}
          />
        );
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleStateTransition)}>
        <Card sx={{ background: 'white' }}>
          <CardContent
            sx={{
              border: '1px solid',
              borderColor: '#E2E9E9',
              m: 1,
            }}
          >
            <Stack gap={3}>
              <FormConnectionGuard>{renderFormStep()}</FormConnectionGuard>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};
