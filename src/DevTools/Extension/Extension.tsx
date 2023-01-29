import { useEffect } from 'react';
import { ActionIcon, Sx } from '@mantine/core';
import { useAtom, useSetAtom } from 'jotai/react';
import { Store } from 'src/types';
import { isShellOpenAtom } from '../atoms/is-shell-open-atom';
import {
  devtoolsJotaiStoreOptions,
  useDevtoolsJotaiStoreOptions,
} from '../internal-jotai-store';
import logo from './assets/jotai-mascot.png';
import { Shell } from './components/Shell';

const shellTriggerButtonStyles: Sx = () => ({
  position: 'fixed',
  left: 10,
  bottom: 10,
  borderRadius: '50%',
  padding: '2rem',
  zIndex: 99999,
  img: {
    height: '2rem',
  },
});

const ShellTriggerButton = () => {
  const setIsShellOpen = useSetAtom(isShellOpenAtom, devtoolsJotaiStoreOptions);

  return (
    <ActionIcon
      variant="filled"
      // TODO make this themable
      color="dark"
      onClick={() => setIsShellOpen(true)}
      sx={shellTriggerButtonStyles}
    >
      <img src={logo} alt="Jotai Mascot" />
    </ActionIcon>
  );
};

export type ExtensionProps = {
  // false by default
  isInitialOpen?: boolean;
  store?: Store;
  // TODO Allow user to pass theme
  // theme?: 'dark' | 'light';
};

export const Extension = ({
  isInitialOpen = false,
  store,
}: ExtensionProps): JSX.Element => {
  const [isShellOpen, setIsShellOpen] = useAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  useEffect(() => {
    // Avoid setting the initial value if the value is found in the local storage
    if (typeof isShellOpen !== 'boolean') {
      setIsShellOpen(isInitialOpen);
    }
    // Intentionally disabled
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isShellOpen && <ShellTriggerButton />}
      {isShellOpen ? <Shell store={store} /> : null}
    </>
  );
};
