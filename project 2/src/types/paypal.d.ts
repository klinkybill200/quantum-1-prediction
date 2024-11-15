declare module '@paypal/react-paypal-js' {
  export interface PayPalScriptOptions {
    'client-id': string;
    currency?: string;
    intent?: 'capture' | 'authorize';
    components?: string;
    'disable-funding'?: string;
  }

  export interface PayPalButtonsComponentProps {
    style?: {
      layout?: 'vertical' | 'horizontal';
      color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
      shape?: 'rect' | 'pill';
      height?: number;
      label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
    };
    createOrder?: (data: any, actions: any) => Promise<string>;
    onApprove?: (data: any, actions: any) => Promise<void>;
    onError?: (err: any) => void;
  }

  export function PayPalScriptProvider(props: {
    options: PayPalScriptOptions;
    children: React.ReactNode;
  }): JSX.Element;

  export function PayPalButtons(props: PayPalButtonsComponentProps): JSX.Element;

  export function usePayPalScriptReducer(): [{ isResolved: boolean }, any];
}