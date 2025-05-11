// Product Data
const products = [
    {
      id: 1,
      name: "Smartphone",
      price: 599.99,
      category: "electronics",
      image: "images/phone.jpg"
    },
    {
      id: 2,
      name: "Laptop",
      price: 999.99,
      category: "electronics",
      image: "images/laptop.jpg"
    },
    {
      id: 3,
      name: "T-Shirt",
      price: 19.99,
      category: "clothing",
      image: "images/tshirt.jpg"
    },
    {
      id: 4,
      name: "Jeans",
      price: 49.99,
      category: "clothing",
      image: "images/jeans.jpg"
    }
  ];
  
  // Cart functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM Elements
  const cartCountElement = document.getElementById('cart-count');
  const productsGrid = document.querySelector('.products-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const contactForm = document.getElementById('contact-form');
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Load products on products page
    if (productsGrid) {
      displayProducts(products);
      
      // Filter products
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          const category = button.dataset.category;
          const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
          
          displayProducts(filteredProducts);
        });
      });
    }
    
    // Load cart items on cart page
    if (cartItemsContainer) {
      displayCartItems();
    }
    
    // Contact form submission
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
      });
    }
  });
  
  // Display products
  function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>$${product.price.toFixed(2)}</p>
          <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
      });
    });
  }
  
  // Add to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
  }
  
  // Update cart
  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cartItemsContainer) {
      displayCartItems();
    }
  }
  
  // Update cart count
  function updateCartCount() {
    if (cartCountElement) {
      cartCountElement.textContent = cart.length;
    }
  }
  
  // Display cart items
  function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
      totalPriceElement.textContent = '0.00';
      return;
    }
    
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
      totalPrice += item.price;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <button class="btn remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    
    totalPriceElement.textContent = totalPrice.toFixed(2);
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        removeFromCart(index);
      });
    });
  }
  
  // Remove from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }