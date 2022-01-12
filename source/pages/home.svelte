<script lang="ts">
	import { Link } from 'svelte-navigator'
	import { ShoppingBagIcon, ShoppingCartIcon } from 'svelte-feather-icons'

	import NotificationDrawer from '../components/notification-drawer.svelte'

	/**
	 * The name of the store. To be passed in as a prop to the `Home` page.
	 */
	export let storeName: string

	// NOTE: These notifications are currently hardcoded, they should be fetched
	// from somewhere.
	const notifications = [
		{
			title: 'Need your attention',
			description: 'Your order from Choudhary Traders is due to arrive today',
			action: {
				label: 'Track it',
				url: '/notifications/1234',
			},
		},
	]
</script>

<main>
	<!-- The page title -->
	<h1 class="rounded">{storeName ?? 'Kirana'}</h1>

	<!-- The main content on the page is in this table -->
	<table id="content" class="center">
		<!-- The first row shows the store owner's notifications -->
		<tr>
			<td colspan="2">
				<NotificationDrawer {notifications} />
			</td>
		</tr>

		<!-- Show the actions the store owner can take -->
		<!-- This web app only shows the catalog page for now -->
		<tr class="center">
			<td>
				<Link to="/catalog">
					<div id="link-to-catalog" class="card action-card unstyled-link">
						<ShoppingBagIcon class="icon" size="36" />
						<p>Catalog</p>
					</div>
				</Link>
			</td>
			<td class="hardcoded">
				<div id="link-to-orders" class="card action-card unstyled-link">
					<ShoppingCartIcon class="icon" size="36" />
					<p>Orders</p>
				</div>
			</td>
		</tr>
	</table>
</main>

<!-- This gives a light grey wash to the rest of the page -->
<svelte:head>
	<style>
		body {
			background-color: #a4abb850;
		}
	</style>
</svelte:head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

	main {
		font-family: 'Poppins', sans-serif;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		background-color: #ffffff;
		border-radius: 1em;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 10%;
		width: 42em;
		padding-bottom: 2em;
	}

	h1 {
		display: auto;
		background-color: #1f2633;
		color: #ffffff;
		padding: 0.5em 1em;
	}

	table {
		border-collapse: separate;
		border-spacing: 50px 0;
	}
	td {
		padding: 1em 0;
	}
	tr {
		padding: 1em 0;
	}

	.unstyled-link {
		text-decoration: none;
		color: #333333;
	}

	.center {
		margin-left: auto;
		margin-right: auto;
	}
	.rounded {
		border-radius: 0.3em 0.3em 0 0;
	}

	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		border-radius: 1em;
		padding: 2em;
	}
	.card:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
	.card:active {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	.action-card {
		height: 4em;
		width: 4em;
	}
</style>
