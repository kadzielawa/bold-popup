<?php 
$restauracjaRequest = $_POST['restauracja'];


if(!$restauracjaRequest):
?>
<html>
	<style>
	pre
	{
	font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
	margin-bottom: 10px;
	width: auto;
	padding: 5px;
	background-color: #eee;
	}
	</style>
</html>
<?php endif; ?>
<?php
$restauracje = [ ["nazwa" => "Grota", "adres" => "Bochnia, ul. Gromadzka 2","telefon" => "601982878"],
				["nazwa" => "Wilczy Szaniec","adres" => "Kluczbork 494","telefon" => "06883212"],
				["nazwa" => "Kredens","adres" => "Warszawa, ul. Ochocka 99","telefon" => "4326724324"],
				["nazwa" => "Smoczy Raj","adres" => "Nowy Targ, ul. Koperkowa 2","telefon" => "5215214"],
				["nazwa" => "Smakosz","adres" => "Bora Komorowskiego 43","telefon" => "74682324"]
				];

if(!$restauracjaRequest){
	print_R("<pre>");
	var_dump($restauracje);
	print_R("</pre>");
} else {
	foreach($restauracje as $index => $restauracja) {
		if($restauracja['nazwa'] == $restauracjaRequest)
		{
			echo json_encode($restauracja);
			return 1;
		}
	}
	echo json_encode(["error" => "nie znaleziono!"]);
}

?>
