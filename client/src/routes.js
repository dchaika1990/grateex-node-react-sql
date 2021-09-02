import {VendorPanel, Auth, VendorPage, Shop, ProductPage, AdminPanel, Cart, Checkout} from "./pages";
import Thank from "./pages/Auth/components/Thank";
import LostPassword from "./pages/Auth/components/LostPassword";
import ChangePassword from "./pages/Auth/components/ChangePassword";
import OrderThanks from "@pages/Checkout/OrderThanks";
import {
    ADMIN_ROUTE,
    PRODUCT_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    THANK_YOU_PAGE,
    VENDOR_PANEL, LOST_PASSWORD, CHANGE_PASSWORD, VENDOR_PAGE, CART_ROUTE, CHECKOUT_ROUTE, ORDER_THANKS,
} from "./utils/consts";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPanel
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]

export const authRoutes = [
    {
        path: VENDOR_PANEL,
        Component: VendorPanel
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: CHECKOUT_ROUTE,
        Component: Checkout
    },
    {
        path: ORDER_THANKS,
        Component: OrderThanks
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: VENDOR_PAGE + '/:nickname',
        Component: VendorPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: THANK_YOU_PAGE,
        Component: Thank
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOST_PASSWORD,
        Component: LostPassword
    },
    {
        path: CHANGE_PASSWORD + '/:link',
        Component: ChangePassword
    },
]
