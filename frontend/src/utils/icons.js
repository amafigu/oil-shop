import {
  faEnvelope,
  faPeopleGroup,
  faSeedling,
  faTree,
} from "@fortawesome/free-solid-svg-icons"

export const getTeaserCardIconByName = (iconName) => {
  switch (iconName) {
    case "faEnvelope":
      return faEnvelope
    case "faPeopleGroup":
      return faPeopleGroup
    case "faSeedling":
      return faSeedling
    case "faTree":
      return faTree
    default:
      return null
  }
}
