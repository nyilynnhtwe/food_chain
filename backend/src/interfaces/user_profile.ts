interface UserProfile {
  id: string; // Unique identifier for the user
  name: string; // Name of the user
  email: string; // Email address of the user
  role: UserRole; // Role of the user (CUSTOMER, RESTAURANT_OWNER, or RIDER)
  orders?: OrderSummary[]; // Optional list of orders made by the user
  restaurants?: RestaurantSummary[]; // Optional list of restaurants owned by the user (only for RESTAURANT_OWNER)
}

interface OrderSummary {
  id: string; // Unique identifier for the order
  restaurantName: string; // Name of the restaurant associated with the order
  status: OrderStatus; // Current status of the order
}

interface RestaurantSummary {
  id: string; // Unique identifier for the restaurant
  name: string; // Name of the restaurant
  menuItems: MenuSummary[]; // List of menu items available at the restaurant
}

interface MenuSummary {
  id: string; // Unique identifier for the menu item
  name: string; // Name of the menu item
  price: number; // Price of the menu item
  available: boolean; // Availability status of the menu item
}

enum UserRole {
  CUSTOMER = "CUSTOMER",
  RESTAURANT_OWNER = "RESTAURANT_OWNER",
  RIDER = "RIDER",
}

enum OrderStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export default UserProfile;