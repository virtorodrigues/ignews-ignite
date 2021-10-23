import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

//getServerSideProps (SSR)
//getStaticProps (SSG)
//API routes

export function SubscribeButton({ priceId }: SubscribeButtonProps) {

  const [session] = useSession();

  async function handleSubscrible() {
    if (!session) {
      signIn('github');

      return;
    }

    //chekout 
    try {
      const response = await api.post('/subscribe');

      const { sessionId }: any = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });

    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscrible}
    >
      Subscribe now
    </button>
  )
}