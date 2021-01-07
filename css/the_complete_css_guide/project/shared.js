const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const selectPlanButtons = document.querySelectorAll('.plan .button');
const modalNoButton = document.querySelector('.modal__action--negative');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');

selectPlanButtons.forEach((button) => {
	button.addEventListener('click', () => {
		openComponent(modal);
		openComponent(backdrop);
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
	closeComponent(backdrop);
	if (modal) {
		closeComponent(modal);
	}
}

toggleButton.addEventListener('click', () => {
	openComponent(mobileNav);
	openComponent(backdrop);
});

const openComponent = (component) => {
	component.classList.add('open');
};
const closeComponent = (component) => {
	component.classList.remove('open');
};
