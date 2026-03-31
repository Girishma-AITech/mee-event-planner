// Mee Event Planner - Main JS
// Contact Form Dynamic Fields
document.addEventListener('DOMContentLoaded', function() {
	const eventType = document.getElementById('event-type');
	const marriageOptions = document.querySelector('.marriage-options');
	const cateringCheckboxes = document.querySelectorAll('input[name="catering"]');
	const cateringDetails = document.querySelector('.catering-details');

	if (eventType) {
		eventType.addEventListener('change', function() {
			if (eventType.value === 'Marriage') {
				marriageOptions.style.display = '';
			} else {
				marriageOptions.style.display = 'none';
			}
		});
	}

	function updateCateringDetails() {
		let show = false;
		cateringCheckboxes.forEach(cb => {
			if (cb.checked && cb.value === 'Yes') show = true;
		});
		cateringDetails.style.display = show ? '' : 'none';
	}
	cateringCheckboxes.forEach(cb => {
		cb.addEventListener('change', updateCateringDetails);
	});
	updateCateringDetails();
	// WhatsApp Send Message functionality
	const contactForm = document.querySelector('.contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault();
			// Collect values
			const name = contactForm.querySelector('[name="name"]').value.trim();
			const phone = contactForm.querySelector('[name="phone"]').value.trim();
			const minBudget = contactForm.querySelector('[name="min_budget"]').value.trim();
			const maxBudget = contactForm.querySelector('[name="max_budget"]').value.trim();
			const eventTypeVal = contactForm.querySelector('[name="event_type"]').value;
			const photography = contactForm.querySelector('[name="photography"]').value;
			// Marriage options (multi)
			let marriageOptions = [];
			if (eventTypeVal === 'Marriage') {
				contactForm.querySelectorAll('input[name="marriage_options"]:checked').forEach(cb => marriageOptions.push(cb.value));
			}
			// Decoration
			let decoration = 'No';
			contactForm.querySelectorAll('input[name="decoration"]:checked').forEach(cb => { if(cb.value==='Yes') decoration='Yes'; });
			// Catering
			let catering = 'No';
			contactForm.querySelectorAll('input[name="catering"]:checked').forEach(cb => { if(cb.value==='Yes') catering='Yes'; });
			// Catering details
			let foodType = '', guests = '', itemsPerPlate = '';
			if (catering === 'Yes') {
				let foodTypes = [];
				contactForm.querySelectorAll('input[name="food_type"]:checked').forEach(cb => foodTypes.push(cb.value));
				foodType = foodTypes.join(', ') || '-';
				guests = contactForm.querySelector('[name="guests"]').value.trim();
				itemsPerPlate = contactForm.querySelector('[name="items_per_plate"]').value.trim();
			}
			// Optional fields
			const email = contactForm.querySelector('[name="email"]').value.trim();
			const mehandiArtist = contactForm.querySelector('[name="mehandi_artist"]').checked ? 'Yes' : 'No';
			const makeup = contactForm.querySelector('[name="makeup"]').checked ? 'Yes' : 'No';

			// Validate required fields
			if (!name || !phone || !minBudget || !maxBudget || !eventTypeVal) {
				alert('Please fill all mandatory fields.');
				return;
			}

			// Format message
			let msg = `Hello Mee Event Planner,%0A%0A`;
			msg += `Name: ${name}%0A`;
			msg += `Phone: ${phone}%0A`;
			msg += `Budget: ${minBudget} - ${maxBudget}%0A`;
			msg += `Event: ${eventTypeVal}`;
			if (eventTypeVal === 'Marriage' && marriageOptions.length) {
				msg += ` (%0A  ${marriageOptions.join(', ')}%0A)`;
			}
			msg += `%0A%0A`;
			msg += `Photography: ${photography || '-'}%0A`;
			msg += `Decoration: ${decoration}%0A`;
			msg += `Catering: ${catering}%0A`;
			if (catering === 'Yes') {
				msg += `%0AFood Type: ${foodType}%0A`;
				msg += `Guests: ${guests || '-'}%0A`;
				msg += `Items per Plate: ${itemsPerPlate || '-'}%0A`;
			}
			msg += `%0AEmail: ${email || '-'}%0A`;
			msg += `Mehandi Artist: ${mehandiArtist}%0A`;
			msg += `Makeup: ${makeup}`;

			// WhatsApp redirect
			const waUrl = `https://wa.me/917780226810?text=${encodeURIComponent(msg.replace(/%0A/g, '\n'))}`;
			window.open(waUrl, '_blank');
		});
	}
});
