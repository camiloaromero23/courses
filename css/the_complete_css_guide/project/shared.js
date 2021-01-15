const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const selectPlanButtons = document.querySelectorAll('.plan .button');
const modalNoButton = document.querySelector('.modal__action--negative');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');
const ctaButton = document.querySelector('.main-nav__item--cta');

selectPlanButtons.forEach((button) => {
	button.addEventListener('click', () => {
		openComponent(modal);
		backdrop.style.display = 'block';
		setTimeout(() => {
			backdrop.classList.add('open');
		}, 10);
	});
});

backdrop.addEventListener('click', () => {
	closeComponent(mobileNav);
	closeModal();
});

if (modalNoButton) {
	modalNoButton.addEventListener('click', closeModal);
}

function closeModal() {
	backdrop.classList.remove('open');
	setTimeout(() => {
		backdrop.style.display = 'none';
	}, 200);
	if (modal) {
		closeComponent(modal);
	}
}

toggleButton.addEventListener('click', () => {
	openComponent(mobileNav);
	openComponent(backdrop);
	setTimeout(() => {
		backdrop.classList.add('open');
	}, 10);
	backdrop.style.display = 'block';
});

const openComponent = (component) => {
	component.classList.add('open');
};
const closeComponent = (component) => {
	component.classList.remove('open');
};

ctaButton.addEventListener('animationstart', (event) => {
	console.log('Animation started', event);
});

ctaButton.addEventListener('animationend', (event) => {
	console.log('Animation ended', event);
});

ctaButton.addEventListener('animationiteration', (event) => {
	console.log('Animation iteration', event);
});
