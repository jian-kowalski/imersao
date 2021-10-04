interface IKeyCloakConfig{
    realm: string,
    url: string,
    clientId: string
}

export const KEYCLOAK_PUBLIC_CONFIG: IKeyCloakConfig = {
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM as string,
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL as string,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID as string,
    
}
