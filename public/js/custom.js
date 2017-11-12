$(function() {

	var badge = parseInt($(".badge").html());



	$('#promocodeButton').on('click', function() {
		var input = $('#code').val();
		if (input === '') {
			return false
		}else{
			$.ajax({
				type: 'POST',
				url: '/promocode',
				data: {
					promocode: input
				},
				success: function(data) {
					if (data === 0) {
						$('#promocodeResponse').html("Code Dosn't Exist");
					}else{
						$('#promocodeButton').html('Applied');
						$('#promocodeButton').prop('disabled', true);
						$('#promocodeResponse').html("Successfully Applied the code");
						$('#totalPrice').html(data);
					}
				}
			});
		}
	});

	$('#add-to-cart').on('click', function() {
		var gig_id = $('#gig_id').val();
		if (gig_id === '') {
			return false
		}else{
			$.ajax({
				type: 'POST',
				url: '/add-to-cart',
				data: {
					gig_id: gig_id
				},
				success: function(data) {
					badge += 1;
					$('.badge').html(badge);
					$('#code').fadeIn();
					$('#code').addClass("alert alert-success").html(data);
					setTimeout(() => {
						$('#code').fadeOut();
					}, 2000);

				}
			});
		}
	});


	$('.remove-item').on('click', function() {
		var gig_id = $(this).attr('id');
		if (gig_id === '') {
			return false
		}else{
			$.ajax({
				type: 'POST',
				url: '/remove-item',
				data: {
					gig_id: gig_id
				},
				success: function(data) {
					var subTotal = parseInt($('#subTotal').html());
					subTotal -= data.price;
					if (subTotal === 0) {
						$(".cart").empty();
						$(".cart").html("Cart is empty");
					}else{
						$('#subTotal').html(subTotal);
						$('#totalPrice').html(data.price);
					}
					badge -= 1;
					$('.badge').html(badge);
					$('#code_message').fadeIn();
					$('#code_message').addClass("alert alert-success").html("item Removed from cart");
					setTimeout(() => {
						$('#code_message').fadeOut();
					}, 2000);
					$('#'+ gig_id).remove();

				}
			});
		}
	});
})