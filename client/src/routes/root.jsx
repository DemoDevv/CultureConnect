import Article from "../components/Article";
import Artwork from "../components/Artwork";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

export default function Root() {
  return (
    <>
      <NavigationBar />

      <div className="h-[2600px] relative overflow-x-hidden">
        <div className="absolute left-[30%] top-[6%] translate-x-[-50%] flex flex-col z-40 gap-5">
          <span className="font-anonymous text-[#B91C1B] text-xl">
            culture connect api
          </span>
          <span className="font-castoro italic text-4xl">
            Votre clé pour un monde d'art <br />
            et de culture sans limites.
          </span>
        </div>

        <Artwork className="h-[320px] w-[320px] bg-[#FEFAEF] shadow-md absolute z-0 left-[45%] top-[12%] translate-x-[-50%]" />
        <Artwork className="h-[481px] w-[588px] bg-[#FAF6F3] shadow-md absolute z-10 left-[65%] top-[2%] translate-x-[-50%]" />
        <Artwork className="h-[429px] w-[490px] bg-white shadow-md absolute z-30 left-[87%] top-[13%] translate-x-[-50%]" />

        <div className="absolute left-[50%] translate-x-[-50%] top-[23%]">
          <div className="relative">
            <div className="h-[1000px] w-[200vw] bg-[#E8DDDA] rotate-[-9.43deg] border-[1px] border-[#B91C1B]"></div>
            <Article
              title="Découvrez des œuvres d'art près de chez vous !"
              content="Notre application vous permet de trouver
            facilement des œuvres d'art exposées
            dans les musées et galeries d'Île-de-France."
              mirror={true}
              className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[60vw]"
            />
          </div>
        </div>

        <Article
          title="Ne perdez jamais de vue vos coups de cœur artistiques !"
          content="Créez votre propre collection d'art en ajoutant
        vos œuvres et musées préférés aux favoris.
        Retrouvez-les facilement plus tard
        pour les admirer, les partager avec vos amis
        ou planifier vos prochaines visites culturelles."
          mirror={false}
          className="absolute left-[50%] translate-x-[-50%] bottom-[5%] translate-y-[-50%] w-[60vw]"
        />
      </div>

      <Footer />
    </>
  );
}
