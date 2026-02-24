import { FooterTransporte } from '../components/layout/footerTransporte';
import NavBarTransporte from '../components/header/navBarTransporte';
import { Numbers } from '../components/numbers/numbers';

export default function Page() {
  return (
    <>
      <NavBarTransporte />
      <Numbers />
      <FooterTransporte />
    </>
  );
}
