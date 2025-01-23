import { ButtonBase, Container, Stack, Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useFooterStyles } from './useFooterStyles';

export const LOMBARD_DOCS_LINK = 'https://docs.lombard.finance/';
export const LOMBARD_PRIVACY_POLICY_LINK = `${LOMBARD_DOCS_LINK}legals/privacy-policy`;
export const TERMS_OF_SERVICE_LINK = `${LOMBARD_DOCS_LINK}legals/terms-of-service`;

export function Footer(): JSX.Element {
  const { keys, t } = useTranslation(translation);
  const { classes } = useFooterStyles();

  const links = [
    {
      href: TERMS_OF_SERVICE_LINK,
      text: keys.tos,
    },
    {
      href: LOMBARD_PRIVACY_POLICY_LINK,
      text: keys.policy,
    },
    {
      href: LOMBARD_DOCS_LINK,
      text: keys.docs,
    },
  ];

  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        py: 3,
        color: 'text.secondary',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <Typography
          variant="body2"
          color={theme => theme.palette.grey[600]}
          sx={{}}
        >
          {t(keys.copyright, { year: new Date().getFullYear() })}
        </Typography>

        <Stack direction="row" alignItems="center" gap={2}>
          {links.map(
            ({ href, text }) =>
              !!href && (
                <ButtonBase
                  key={href}
                  className={classes.link}
                  href={href}
                  target="_blank"
                  rel="norefferer"
                >
                  {t(text)}
                </ButtonBase>
              ),
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
