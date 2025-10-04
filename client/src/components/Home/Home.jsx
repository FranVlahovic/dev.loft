import { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Home() {
  useEffect(() => {
    document.title = 'dev.loft - for devs to share';
  }, []);
  return (
    <>
      <Navbar
        title="dev.loft"
        description="This forum is made in order for people to share knowledge regarding development"
      />
      <div className="main"></div>
    </>
  );
}
