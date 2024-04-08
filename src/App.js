import { Suspense, useEffect } from "react";
import Index from "./jsx";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
import "./other/swiper/swiper-bundle.min.css";
import "./css/style.css";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    checkAutoLogin(dispatch, navigate);
  }, []);
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }>
          <Index />
        </Suspense>
      </>
    );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};
export default withRouter(connect(mapStateToProps)(App));