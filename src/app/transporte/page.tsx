import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import HeroTransporte from '../components/heroTransporte/heroTransporte';
import { Benefits } from '../components/benefits/benefits';
import { Numbers } from '../components/numbers/numbers';
import { TransportForm } from '../components/transportForm/transportForm';
import { Arguments } from '../components/arguments/arguments';
import { Sustainability } from '../components/sustainability/sustainability';
import BtnWhatsapp from '../components/btnWhatsapp/btnWhatsapp';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <HeroTransporte />
      <Benefits />
      <Arguments />
      <Numbers />
      <Sustainability />
      <TransportForm />
      <FooterTransporte />
      <BtnWhatsapp phoneNumber="+5492615591335" color="blue" />
    </>
  );
}
