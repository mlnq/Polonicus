import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Card, Header} from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer (function AccountDetails()
{
    const {userStore}=useStore();
    const {accountDetails,getAge} = userStore;
    const [t, i18n] = useTranslation('common');

    return(
        <>
        <Header as="h2">{t("account.accountDetails")}</Header>
        <Card>
            <Card.Content>
            <Card.Header>{accountDetails!.firstName} {accountDetails!.lastName}</Card.Header>
            <Card.Meta>
               {t("account.age")} {getAge()}
            </Card.Meta>
            <Card.Description>
               {t("account.email")}<strong>{accountDetails!.email}</strong>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            {t("account.role")} {accountDetails?.roleId === 2 ? "Administrator" : "Użytkownik" }
            </Card.Content>
        </Card>
              
        </>
    );

});