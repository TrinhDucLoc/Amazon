# Amazon

24. Register function.

    - registerConstants in userConstants
    - registerAction in userAction
    - registerReducer in userReducer
    - store.js save userRegisterReducer
    - registerScreen
    - App.js add route path "/register" with component={RegisterScreen}

25. Shipping Page

    - CheckoutSteps.js: component checkout steps
    - cartConstants.js: shipping constants
    - cartActions.js: save shipping address action
    - cartReducers.js: shipping reducer
    - store.js: save shipping address at localStorage
    - ShippingAddressScreen.js: Shipping address screen
    - index.css: update css for shipping screen
    - App.js: add route path shipping screen
    - ProductScreen.js: Edit text and format number for price

26. Payment method

    - cartConstants.js: payment constants
    - cartActions.js: choose payment method
    - cartReducers.js: Add case paymentMethod
    - store.js: save paymentMethod
    - PaymentMethodScreen.js: Create payment screen
    - index.css: update css for payment screen
    - App.js: add route path payment screen
    - userAction.js: remove item shippingAddress from localStorage

27. Place order

    1.  PlaceOrderScreen.js: Create place order screen
    2.  App.js: add route path place order screen

28. Order checkout
