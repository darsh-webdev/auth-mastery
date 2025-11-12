import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
import {
  inferAdditionalFields,
  passkeyClient,
  twoFactorClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    passkeyClient(),
    twoFactorClient({
      onTwoFactorRedirect: () => {
        window.location.href = "/auth/2fa";
      },
    }),
  ],
});
