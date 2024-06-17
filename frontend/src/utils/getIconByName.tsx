import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faDhl,
  faGooglePay,
  faPaypal,
  faSquareFacebook,
  faSquareInstagram,
  faSquareYoutube,
  faUps,
} from "@fortawesome/free-brands-svg-icons"
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faEnvelope,
  faGlobe,
  faLock,
  faMinus,
  faPeopleGroup,
  faPlus,
  faQuestionCircle,
  faSearch,
  faSeedling,
  faTrash,
  faTree,
  faUnlock,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons"

const icons: { [key: string]: IconDefinition } = {
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faGlobe,
  faUser,
  faX,
  faBars,
  faSearch,
  faDhl,
  faGooglePay,
  faPaypal,
  faSquareFacebook,
  faSquareInstagram,
  faSquareYoutube,
  faUps,
  faChevronRight,
  faChevronLeft,
  faEnvelope,
  faLock,
  faMinus,
  faPeopleGroup,
  faPlus,
  faSeedling,
  faTrash,
  faTree,
  faUnlock,
  faArrowRightFromBracket,
  faQuestionCircle,
}

export const getIconByName = (iconName: string): IconDefinition => {
  const icon = icons[iconName]
  return icon || faQuestionCircle
}
