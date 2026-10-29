import { useTranslation } from "react-i18next";

export default function Home(){
    const { t } = useTranslation();

    return(
        <main>
            <h1>{t("home.title")}</h1>
            <p>{t("home.introduction")}</p>
        </main>
    );
}