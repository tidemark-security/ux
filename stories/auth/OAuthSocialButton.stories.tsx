import type { Meta, StoryObj } from "@storybook/react-vite";

import { googleLogoUrl } from "../../src/assets";
import { OAuthSocialButton } from "../../src";

const meta = {
  title: "Auth/OAuthSocialButton",
  component: OAuthSocialButton,
  tags: ["autodocs"],
  args: {
    children: "Continue with Google",
    logo: googleLogoUrl,
    disabled: false,
  },
} satisfies Meta<typeof OAuthSocialButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Providers: Story = {
  render: () => (
    <div className="grid w-[360px] gap-3">
      <OAuthSocialButton logo={googleLogoUrl}>Continue with Google</OAuthSocialButton>
      <OAuthSocialButton>Continue with GitHub</OAuthSocialButton>
      <OAuthSocialButton logo={googleLogoUrl} disabled>
        Sign in disabled
      </OAuthSocialButton>
    </div>
  ),
};