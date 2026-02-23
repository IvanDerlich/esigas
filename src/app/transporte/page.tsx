import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import { Benefits } from '../components/benefits/benefits';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <Benefits />
      <FooterTransporte />
    </>
  );
}
