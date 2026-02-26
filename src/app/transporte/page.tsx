import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import { Benefits } from '../components/benefits/benefits';
import { Numbers } from '../components/numbers/numbers';
import { TransportForm } from '../components/transportForm/transportForm';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <Benefits />
      <Numbers />
      <TransportForm />
      <FooterTransporte />
    </>
  );
}
