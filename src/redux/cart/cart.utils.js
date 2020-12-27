//Purpose of addItemToCart:
//1. if added item is new, it will give quantity property to new item
//2. if added item already exists, it will add 1 to quantity 
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

//Purpose of removeItemFromCart:
//1. if cartItemToRemove.quantity is 1, we want to remove that item from our cart
//2. if cartItemToRemove.quantity is greater than 1, we want to decrease the quantity by 1
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingItem.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
};

