import { useDepositBtcAddress } from 'modules/stake/hooks/useDepositBtcAddress';
import ReCAPTCHA from 'react-google-recaptcha';
import { useController, useFormContext } from 'react-hook-form';

type FormValues = {
  captchaToken: string;
};

const CAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export function RecaptchaField() {
  const { control } = useFormContext<FormValues>();

  const { field } = useController({
    name: 'captchaToken',
    control,
    rules: { required: true },
  });

  const { depositAddress, isLoading } = useDepositBtcAddress();

  if (isLoading || depositAddress) {
    return null;
  }

  return (
    <ReCAPTCHA {...field} sitekey={CAPTCHA_KEY} onChange={field.onChange} />
  );
}
