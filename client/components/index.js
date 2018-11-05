/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

// All Visitors
export {default as AccessBar} from './AccessBar'
export {default as BootNav} from './BootNavbar'
export {default as Footer} from './Footer'
export {default as UserHome} from './Homepage'
export {default as NoMatch} from './NoMatch'

export {default as SingleJelly} from './SingleJelly'
export {default as Category} from './Category'
export {default as JellyReviews} from './JellyReviews'
export {default as SingleReview} from './SingleReview'
export {default as AddReviewForm} from './AddReviewForm'
export {default as OrderHistory} from './OrderHistory'
export {default as JellyList} from './JellyList'
export {default as Searchbar} from './Toolbar'
export {Login, Signup} from './AuthForm'
export {default as CartView} from './CartView'

// Admins Only
export {default as AddJellyForm} from './admin/AddJellyForm'
export {default as EditJellyForm} from './admin/EditJellyForm'
export {default as AdminLanding} from './admin/AdminLanding'
