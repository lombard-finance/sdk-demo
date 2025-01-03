import { useStakeForm } from 'modules/stake/hooks/useStakeForm';
import ReCAPTCHA from 'react-google-recaptcha';
import { useController, useFormContext } from 'react-hook-form';

type FormValues = {
  captchaToken: string;
};

// Check if the recaptcha key is set in the environment variables
const CAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

export function RecaptchaField() {
  const { control } = useFormContext<FormValues>();

  const { field } = useController({
    name: 'captchaToken',
    control,
    rules: { required: true },
  });

  const { hasAddress, needsSignature, isLoading } = useStakeForm();

  if (isLoading || (hasAddress && !needsSignature)) {
    return null;
  }

  return (
    <ReCAPTCHA {...field} sitekey={CAPTCHA_KEY} onChange={field.onChange} />
  );
}
