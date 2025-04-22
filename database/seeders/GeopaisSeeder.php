<?php

namespace Database\Seeders;

use App\Models\GeoPais;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeopaisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GeoPais::firstOrCreate([
            'id' => '1',
            'nombre' => '<sin info>',
            'abreviatura' => '<s/i>',
            'sn_activo' => '1',
            'isonumero' => '0',
            'iso2' => '.',
            'iso3' => '.',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '2',
            'nombre' => 'AFGANISTÁN',
            'abreviatura' => 'AFG',
            'sn_activo' => '0',
            'isonumero' => '4',
            'iso2' => 'AF',
            'iso3' => 'AFG',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '3',
            'nombre' => 'ISLAS GLAND',
            'abreviatura' => 'ALA',
            'sn_activo' => '0',
            'isonumero' => '248',
            'iso2' => 'AX',
            'iso3' => 'ALA',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '4',
            'nombre' => 'ALBANIA',
            'abreviatura' => 'ALB',
            'sn_activo' => '0',
            'isonumero' => '8',
            'iso2' => 'AL',
            'iso3' => 'ALB',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '5',
            'nombre' => 'ALEMANIA',
            'abreviatura' => 'DEU',
            'sn_activo' => '0',
            'isonumero' => '276',
            'iso2' => 'DE',
            'iso3' => 'DEU',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '6',
            'nombre' => 'ANDORRA',
            'abreviatura' => 'AND',
            'sn_activo' => '0',
            'isonumero' => '20',
            'iso2' => 'AD',
            'iso3' => 'AND',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '7',
            'nombre' => 'ANGOLA',
            'abreviatura' => 'AGO',
            'sn_activo' => '0',
            'isonumero' => '24',
            'iso2' => 'AO',
            'iso3' => 'AGO',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '8',
            'nombre' => 'ANGUILLA',
            'abreviatura' => 'AIA',
            'sn_activo' => '0',
            'isonumero' => '660',
            'iso2' => 'AI',
            'iso3' => 'AIA',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '9',
            'nombre' => 'ANTÁRTIDA',
            'abreviatura' => 'ATA',
            'sn_activo' => '0',
            'isonumero' => '10',
            'iso2' => 'AQ',
            'iso3' => 'ATA',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '10',
            'nombre' => 'ANTIGUA Y BARBUDA',
            'abreviatura' => 'ATG',
            'sn_activo' => '0',
            'isonumero' => '28',
            'iso2' => 'AG',
            'iso3' => 'ATG',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '11',
            'nombre' => 'ANTILLAS HOLANDESAS',
            'abreviatura' => 'ANT',
            'sn_activo' => '0',
            'isonumero' => '530',
            'iso2' => 'AN',
            'iso3' => 'ANT',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '12',
            'nombre' => 'ARABIA SAUDÍ',
            'abreviatura' => 'SAU',
            'sn_activo' => '0',
            'isonumero' => '682',
            'iso2' => 'SA',
            'iso3' => 'SAU',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '13',
            'nombre' => 'ARGELIA',
            'abreviatura' => 'DZA',
            'sn_activo' => '0',
            'isonumero' => '12',
            'iso2' => 'DZ',
            'iso3' => 'DZA',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '14',
            'nombre' => 'ARGENTINA',
            'abreviatura' => 'ARG',
            'sn_activo' => '1',
            'isonumero' => '32',
            'iso2' => 'AR',
            'iso3' => 'ARG',
            'ddi' => '54',
            'sn_provincia_determinada' => '1',
            'id_provincia_determinada' => '14',
        ]);

        GeoPais::firstOrCreate([
            'id' => '15',
            'nombre' => 'ARMENIA',
            'abreviatura' => 'ARM',
            'sn_activo' => '0',
            'isonumero' => '51',
            'iso2' => 'AM',
            'iso3' => 'ARM',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '16',
            'nombre' => 'ARUBA',
            'abreviatura' => 'ABW',
            'sn_activo' => '0',
            'isonumero' => '533',
            'iso2' => 'AW',
            'iso3' => 'ABW',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '17',
            'nombre' => 'AUSTRALIA',
            'abreviatura' => 'AUS',
            'sn_activo' => '0',
            'isonumero' => '36',
            'iso2' => 'AU',
            'iso3' => 'AUS',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '18',
            'nombre' => 'AUSTRIA',
            'abreviatura' => 'AUT',
            'sn_activo' => '0',
            'isonumero' => '40',
            'iso2' => 'AT',
            'iso3' => 'AUT',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '19',
            'nombre' => 'AZERBAIYÁN',
            'abreviatura' => 'AZE',
            'sn_activo' => '0',
            'isonumero' => '31',
            'iso2' => 'AZ',
            'iso3' => 'AZE',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '20',
            'nombre' => 'BAHAMAS',
            'abreviatura' => 'BHS',
            'sn_activo' => '0',
            'isonumero' => '44',
            'iso2' => 'BS',
            'iso3' => 'BHS',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '21',
            'nombre' => 'BAHRÁIN',
            'abreviatura' => 'BHR',
            'sn_activo' => '0',
            'isonumero' => '48',
            'iso2' => 'BH',
            'iso3' => 'BHR',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '22',
            'nombre' => 'BANGLADESH',
            'abreviatura' => 'BGD',
            'sn_activo' => '0',
            'isonumero' => '50',
            'iso2' => 'BD',
            'iso3' => 'BGD',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '23',
            'nombre' => 'BARBADOS',
            'abreviatura' => 'BRB',
            'sn_activo' => '0',
            'isonumero' => '52',
            'iso2' => 'BB',
            'iso3' => 'BRB',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '24',
            'nombre' => 'BIELORRUSIA',
            'abreviatura' => 'BLR',
            'sn_activo' => '0',
            'isonumero' => '112',
            'iso2' => 'BY',
            'iso3' => 'BLR',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '25',
            'nombre' => 'BÉLGICA',
            'abreviatura' => 'BEL',
            'sn_activo' => '0',
            'isonumero' => '56',
            'iso2' => 'BE',
            'iso3' => 'BEL',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '26',
            'nombre' => 'BELICE',
            'abreviatura' => 'BLZ',
            'sn_activo' => '0',
            'isonumero' => '84',
            'iso2' => 'BZ',
            'iso3' => 'BLZ',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '27',
            'nombre' => 'BENIN',
            'abreviatura' => 'BEN',
            'sn_activo' => '0',
            'isonumero' => '204',
            'iso2' => 'BJ',
            'iso3' => 'BEN',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '28',
            'nombre' => 'BERMUDAS',
            'abreviatura' => 'BMU',
            'sn_activo' => '0',
            'isonumero' => '60',
            'iso2' => 'BM',
            'iso3' => 'BMU',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '29',
            'nombre' => 'BHUTÁN',
            'abreviatura' => 'BTN',
            'sn_activo' => '0',
            'isonumero' => '64',
            'iso2' => 'BT',
            'iso3' => 'BTN',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '30',
            'nombre' => 'BOLIVIA',
            'abreviatura' => 'BOL',
            'sn_activo' => '0',
            'isonumero' => '68',
            'iso2' => 'BO',
            'iso3' => 'BOL',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '31',
            'nombre' => 'BOSNIA Y HERZEGOVINA',
            'abreviatura' => 'BIH',
            'sn_activo' => '0',
            'isonumero' => '70',
            'iso2' => 'BA',
            'iso3' => 'BIH',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '32',
            'nombre' => 'BOTSUANA',
            'abreviatura' => 'BWA',
            'sn_activo' => '0',
            'isonumero' => '72',
            'iso2' => 'BW',
            'iso3' => 'BWA',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '33',
            'nombre' => 'ISLA BOUVET',
            'abreviatura' => 'BVT',
            'sn_activo' => '0',
            'isonumero' => '74',
            'iso2' => 'BV',
            'iso3' => 'BVT',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '34',
            'nombre' => 'BRASIL',
            'abreviatura' => 'BRA',
            'sn_activo' => '1',
            'isonumero' => '76',
            'iso2' => 'BR',
            'iso3' => 'BRA',
            'ddi' => '0',
            'sn_provincia_determinada' => '1',
            'id_provincia_determinada' => '1',
        ]);

        GeoPais::firstOrCreate([
            'id' => '35',
            'nombre' => 'BRUNÉI',
            'abreviatura' => 'BRN',
            'sn_activo' => '0',
            'isonumero' => '96',
            'iso2' => 'BN',
            'iso3' => 'BRN',
            'ddi' => '0',
            'sn_provincia_determinada' => '0',
            'id_provincia_determinada' => '1',
        ]);
    }
}
