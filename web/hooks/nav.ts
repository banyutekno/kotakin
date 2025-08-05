import { useNavigate } from 'react-router-dom';

export const useNav = () => {
  const navigate = useNavigate();

  const popPage = (fallbackUrl: string) => {
    if (window.history.length > 1) {
      return window.history.back();
    }

    navigate(fallbackUrl, { replace: true });
  };

  const pushPage = (url: string) => {
    navigate(url);
  };

  const replacePage = (url: string) => {
    navigate(url, { replace: true });
  };
  return {
    pushPage,
    replacePage,
    popPage,
  };
};
