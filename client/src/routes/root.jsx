import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

export default function Root() {
  return (
    <>
      <NavigationBar />

      <div className="h-[3000px]">
        <div className="absolute h-[1500px] w-[200vw] bg-[#E8DDDA] rotate-[-9.43deg] left-[50%] translate-x-[-50%] border-[1px] border-[#B91C1B]"></div>
      </div>

      <Footer />
    </>
  );
}
