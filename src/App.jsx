import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ErrorPage from "./components/ErrorPage";
import HomeScreen from "./screens/HomeScreen";
import BookingPage from "./screens/BookingPage";
import BookingCard from "./screens/BookingCard";
import Listing from "./screens/Listing";
import { ToastContainer } from "react-toastify";
import Details from "./screens/Details";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import BlogsMainPage from "./pages/BlogsMainPage";
import BlogDetailPage from "./pages/BlogDetailsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofService from "./pages/TermsofService";
import CancellationPolicy from "./pages/CancellationPolicy";
import FormPage from "./pages/Buy/EnterInformation";
import UploadDocuments from "./pages/Buy/UploadDocuments";
import DatePicker from "./pages/Buy/DatePicker";
import CareerForm from "./pages/Career";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop /> {/* Ensures scrolling to top on route change */}
                <Routes>
                    {/* HomePage urls */}
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/home" element={<HomeScreen />} />
                    <Route
                        path="/self-drive-car-rentals"
                        element={<HomeScreen />}
                    />
                    <Route
                        path="/self-drive-car-rentals/:city"
                        element={<HomeScreen />}
                    />

                    {/* Page2 */}
                    <Route
                        path="/self-drive-car-rentals/:city/cars"
                        element={<Listing />}
                    />

                    {/* Page3 */}
                    {/* Temporarily disabled */}
                    <Route path="/booking-card" element={<BookingCard />} />

                    {/* Page4 */}
                    <Route
                        path="/self-drive-car-rentals/:city/cars/booking-details"
                        element={<Details />}
                    />

                    {/* Page5 */}
                    <Route
                        path="/self-drive-car-rentals/:city/cars/booking-details/confirmation"
                        element={<BookingPage />}
                    />
                    
                    {/* Buy Page Routes*/}
                    <Route path="/buy/date-picker" element={<DatePicker />} />
                    <Route path="/buy/upload-info" element={<FormPage />} />
                    <Route path="/buy/upload-doc" element={<UploadDocuments />} />

                    {/* NavBar Pages */}
                    {/* About Us */}
                    <Route path="/about-us" element={<AboutUs />} />
                    {/* Contact Us */}
                    <Route path="/contact-us" element={<ContactUs />} />
                    {/* Carrer */}
                    <Route path="/career" element={<CareerForm />} />
                    {/* Blogs  */}
                    <Route path="/blogs" element={<BlogsMainPage />} />
                    <Route path="/blogs/:id" element={<BlogDetailPage />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route
                        path="/termsofservice"
                        element={<TermsofService />}
                    />
                    <Route
                        path="/cancellationpolicy"
                        element={<CancellationPolicy />}
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;
