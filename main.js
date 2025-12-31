document.addEventListener('DOMContentLoaded', () => {
    // 1. WhatsApp Logic for Order Page
    const orderButtons = document.querySelectorAll('.btn-whatsapp-order');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const format = e.target.closest('.card').getAttribute('data-format');
            const phoneNumber = "628123456789"; // Ganti ke nomor Anda
            const message = `Halo Pola Studio! Saya ingin memesan cetak format: ${format}. Mohon info selanjutnya.`;
            
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });

    // 2. Simple Scroll Reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
});

// Add this inside your DOMContentLoaded event
const copySection = document.querySelector('.copy-section');

const copyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

if(copySection) {
    copyObserver.observe(copySection);
}






const burger = document.getElementById("burger");
const nav = document.getElementById("nav-links");
const closeBtn = document.getElementById("close-menu");
const links = nav.querySelectorAll("a");

function openMenu() {
  nav.classList.add("active");
  burger.classList.add("active");
}

function closeMenu() {
  nav.classList.remove("active");
  burger.classList.remove("active");
}

burger.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// Auto close when clicking a link
links.forEach(link => {
  link.addEventListener("click", closeMenu);
});


// Add a simple animation for the checkmarks
const listItems = document.querySelectorAll('ul li');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.5 });

listItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease-out';
    observer.observe(item);
});



const welcomeSection = document.querySelector('.welcome-section');

const welcomeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.3 });

if (welcomeSection) {
    welcomeObserver.observe(welcomeSection);
}





let cart = {};

const drawer = document.getElementById('cart-drawer');
const minTrigger = document.getElementById('cart-minimized');
const closeBt = document.getElementById('close-drawer');

// Toggle Drawer (Maximize)
const openDrawer = () => drawer.classList.add('drawer-open');
const closeDrawer = () => drawer.classList.remove('drawer-open');

minTrigger.addEventListener('click', openDrawer);
closeBt.addEventListener('click', closeDrawer);

// Add to Cart Function
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        if (cart[name]) {
            cart[name].qty += 1;
        } else {
            cart[name] = { qty: 1, price: price };
        }
        
        updateUI();
        openDrawer(); // Automatically maximize drawer when adding item
    });
});

function changeQty(name, amt) {
    if (cart[name]) {
        cart[name].qty += amt;
        if (cart[name].qty <= 0) delete cart[name];
        updateUI();
    }
}

function updateUI() {
    const itemsContainer = document.getElementById('drawer-items');
    const totalSpan = document.getElementById('drawer-total');
    const countSpan = document.getElementById('cart-count');
    
    let total = 0;
    let count = 0;
    itemsContainer.innerHTML = '';

    Object.keys(cart).forEach(name => {
        const item = cart[name];
        total += item.qty * item.price;
        count += item.qty;

        itemsContainer.innerHTML += `
            <div class="flex justify-between items-center border-b pb-4">
                <div>
                    <h4 class="font-bold text-gray-800">${name}</h4>
                    <p class="text-sm text-blue-600">RM ${(item.qty * item.price).toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                    <button onclick="changeQty('${name}', -1)" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm">-</button>
                    <span class="font-bold w-6 text-center">${item.qty}</span>
                    <button onclick="changeQty('${name}', 1)" class="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm">+</button>
                </div>
            </div>
        `;
    });

    totalSpan.innerText = total.toFixed(2);
    countSpan.innerText = count;

    // Minimize logic: Show floating icon if cart has items
    if (count > 0) {
        minTrigger.classList.remove('hidden');
    } else {
        minTrigger.classList.add('hidden');
        closeDrawer();
    }
}

// WhatsApp Integration
document.getElementById('whatsapp-checkout').addEventListener('click', () => {
    let msg = "Halo Waveypix! Saya ingin order:\n\n";
    Object.keys(cart).forEach(name => {
        msg += `• ${name} (x${cart[name].qty})\n`;
    });
    msg += `\nTotal: RM ${document.getElementById('drawer-total').innerText}`;
    window.open(`https://wa.me/601115147474?text=${encodeURIComponent(msg)}`, '_blank');
});



/**ni bahagian contact */

document.getElementById('direct-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const phoneNumber = "628123456789"; // Ganti dengan nombor anda
    
    // Create WhatsApp URL
    const waText = `Halo Waveypix! Saya ${name}.\n\nMesej: ${message}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waText)}`;
    
    // Redirect
    window.open(waUrl, '_blank');
});


window.addEventListener('scroll', () => {
    const scrollVal = window.pageYOffset;
    const skyscrapers = document.querySelectorAll('.building-texture');
    
    skyscrapers.forEach(bg => {
        // Move the window texture background at a different speed
        bg.style.backgroundPositionY = -(scrollVal * 0.2) + 'px';
    });
});




/**ad bottom */


function showAd() {
  document.getElementById("bottom-ad").classList.add("active");
  document.getElementById("ad-overlay").classList.add("active");
}

function closeAd() {
  document.getElementById("bottom-ad").classList.remove("active");
  document.getElementById("ad-overlay").classList.remove("active");
}

// Show after delay (slow appearance)
setTimeout(showAd, 2000);

// Close when clicking outside
document.getElementById("ad-overlay").addEventListener("click", closeAd);


/**cookies */



document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("cookieConsent")) {
        setTimeout(() => {
            document.getElementById("cookie-banner").classList.add("show");
        }, 600); // delay for smooth effect
    }
});

function acceptCookies() {
    localStorage.setItem("cookieConsent", "accepted");
    closeCookieBanner();
}

function declineCookies() {
    localStorage.setItem("cookieConsent", "declined");
    closeCookieBanner();
}

function closeCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    banner.classList.remove("show");

    setTimeout(() => {
        banner.style.display = "none";
    }, 500);
}


/**what contact */

document.getElementById("direct-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    const phoneNumber = "601115147474"; // WhatsApp format (no spaces, no +)

    const whatsappMessage =
        `Nama: ${name}%0A` +
        `Mesej: ${message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");
});

/**ad */




const bottomAd = document.getElementById("bottom-add");

window.addEventListener("load", () => {
  setTimeout(() => {
    bottomAd.classList.add("active");
  }, 1000); // 1 second
});

function closeAd() {
  bottomAd.classList.remove("active");
}


