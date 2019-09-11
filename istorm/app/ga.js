import ReactGA from 'react-ga';
import { GOOGLE_ANALITYCS } from "./utils/constants"

export function initializeReactGA(history) {
    ReactGA.initialize(GOOGLE_ANALITYCS);
    ReactGA.event({
        category: 'App',
        action: 'open',
    });
    
    history.listen(location => {
        ReactGA.pageview(location.pathname)
    });
}