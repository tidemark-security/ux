import type { Meta, StoryObj } from "@storybook/react";

import { googleLogoUrl, interceptLogoWhiteUrl } from "../src/assets";
import { Button, OAuthSocialButton, SignIn, TextField } from "../src";

type AuthStoryArgs = {
  authMode: "local" | "sso";
  showPasskey: boolean;
};

const meta = {
  title: "Auth/Sign In",
  component: SignIn,
  tags: ["autodocs"],
  argTypes: {
    authMode: {
      control: "inline-radio",
      options: ["local", "sso"],
    },
    showPasskey: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof SignIn>;

export default meta;

type Story = StoryObj<typeof meta & { args: AuthStoryArgs }>;

export const Basic: Story = {
  args: {
    authMode: "local",
    showPasskey: true,
  },
  render: ({ authMode, showPasskey }) => (
    <div className="w-[496px] rounded-md border border-neutral-border bg-default-background p-6">
      {authMode === "sso" ? (
        <div className="flex w-full max-w-[448px] flex-col items-center justify-center gap-8 rounded-md px-6 py-6">
          <img className="flex-none" alt="Product logo" src={interceptLogoWhiteUrl} />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <hr className="w-full border-brand-primary" />
            <span className="w-full text-heading-2 font-heading-2 text-subtext-color">External sign in</span>
            <div className="flex w-full flex-col gap-2">
              <OAuthSocialButton className="h-10 w-full flex-none" logo={googleLogoUrl}>
                Continue with SSO
              </OAuthSocialButton>
              <OAuthSocialButton className="h-10 w-full flex-none">Continue with GitHub</OAuthSocialButton>
            </div>
            <hr className="w-full border-brand-primary" />
          </div>
        </div>
      ) : (
        <SignIn
          logo={interceptLogoWhiteUrl}
          enableExternal={false}
          emailField={
            <TextField className="h-auto w-full flex-none" label="Email address">
              <TextField.Input placeholder="analyst@tidemark.ai" />
            </TextField>
          }
          passwordField={
            showPasskey ? null : (
              <TextField className="h-auto w-full flex-none" label="Password">
                <TextField.Input type="password" placeholder="••••••••" />
              </TextField>
            )
          }
          passkeyButton={
            showPasskey ? (
              <Button className="w-full" variant="neutral-secondary">
                Use passkey
              </Button>
            ) : null
          }
          submitButton={<Button className="w-full">Sign in</Button>}
        />
      )}
    </div>
  ),
};