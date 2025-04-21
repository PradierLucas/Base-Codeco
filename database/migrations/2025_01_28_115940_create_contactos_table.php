<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contactos', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid',36)->nullable();
            $table->unsignedBigInteger('id_fisicojuridico')->default(1);
            $table->foreign('id_fisicojuridico', 'FK_id_fisicojuridico_contactos')
            ->references('id')->on('fisicojuridicos')
            ->onDelete('cascade');
            $table->index('id_fisicojuridico', 'IDX_id_fisicojuridico_contactos');
            $table->unsignedBigInteger('id_pais')->default(1);
            $table->index('id_pais','IDX_id_pais_contactos');
            $table->foreign('id_pais','FK_id_pais_contactos')
            ->references('id')->on('geopais')
            ->onDelete('cascade');
            $table->string('car',6)->nullable();
            $table->string('tratamiento',45)->nullable();
            $table->string('apellidorazonsocial',100);
            $table->string('nombrefantasia',100)->nullable();
            $table->string('nombresegundo',55)->nullable();
            $table->string('apellidoynombre',255);
            $table->unsignedBigInteger('id_nacionalidad')->default(1)->nullable();
            $table->index('id_nacionalidad','IDX_id_nacionalidad_contactos');
            $table->foreign('id_nacionalidad','FK_id_nacionalidad_contactos')
            ->references('id')->on('geopais')
            ->onDelete('cascade'); 
            $table->date('fechanacimiento')->nullable();
            $table->date('fechafallecimiento')->nullable();
            $table->unsignedBigInteger('id_situacioncivil')->default(1);
            $table->index('id_situacioncivil','IDX_id_situacioncivil_contacto');
            $table->foreign('id_situacioncivil','FK_id_situacioncivil_contactos')
            ->references('id')->on('contactosituacionciviles')
            ->onDelete('cascade'); 
            $table->unsignedBigInteger('id_personal')->default(1);
            $table->index('id_personal','IDX_id_personal_contactos');
            $table->foreign('id_personal','FK_id_personal_contactos')
            ->references('id')->on('identidades')
            ->onDelete('cascade'); 
            $table->string('id_personal_dato',50)->default(0);
            $table->unsignedBigInteger('id_condiciontributaria')->default(1);
            $table->index('id_condiciontributaria','IDX_id_condiciontributaria_contactos');
            $table->foreign('id_condiciontributaria', 'FK_id_condiciontributaria_contactos')
            ->references('id')->on('condiciontributarias')
            ->onDelete('cascade');
            $table->unsignedBigInteger('id_identidadtributaria')->default(1);
            $table->index('id_identidadtributaria','IDX_id_identidadtributaria_contactos');
            $table->foreign('id_identidadtributaria','FK_id_identidadtributaria_contactos')
            ->references('id')->on('identidades')
            ->onDelete('cascade');
            $table->string('id_identidadtributaria_dato',50)->default(0);
            $table->string('mail_tipo',45)->default(null)->nullable();
            $table->string('mail_direccion',100)->default(null)->nullable();
            $table->string('telefono_tipo',45)->default(null)->nullable();
            $table->string('telefono_numero',45)->default(null)->nullable();
            $table->boolean('telefono_sn_movil')->default(0)->nullable();
            $table->mediumText('observacion')->nullable();
            $table->mediumText('nota')->nullable();

            $table->unsignedBigInteger('id_provincia')->default(1);
            $table->index('id_provincia','FK_id_provincia_contactos_idx');
            $table->foreign('id_provincia','FK_id_provincia_contactos')
            ->references('id')->on('geoprovinciasregiones')
            ->onDelete('cascade');
            $table->unsignedBigInteger('id_subregion')->default(1);
            $table->index('id_subregion','IDX_id_subregion_contactos');
            $table->foreign('id_subregion','FK_id_subregion_contactos')
            ->references('id')->on('geoprovinciasregiones')
            ->onDelete('cascade');
            $table->string('direccion_calle',255)->default(null)->nullable();
            $table->unsignedBigInteger('id_departamento_ciudad')->default(1);
            $table->index('id_departamento_ciudad','IDX_id_departamento_ciudad_contactos');
            $table->foreign('id_departamento_ciudad','FK_id_departamento_ciudad_contactos')
            ->references('id')->on('geolugares')
            ->onDelete('cascade');
            $table->string('departamento_ciudad',255)->default(null)->nullable();
            $table->unsignedBigInteger('id_localidad')->default(1);
            $table->index('id_localidad','IDX_id_localidad_contactos');
            $table->foreign('id_localidad','FK_id_localidad_contactos')
            ->references('id')->on('geolugares')
            ->onDelete('cascade');
            $table->string('localidad',255)->default(null)->nullable();
            $table->string('codigo_postal',20)->default(null)->nullable();
            $table->string('domicilioformateado',255)->default(null)->nullable();
            $table->text('foto')->nullable();
            $table->date('fecha_form_alta')->nullable();
            $table->date('fecha_form_modificacion')->nullable();
            $table->date('fecha_vigenciahasta')->nullable();
            $table->index('patronbusqueda','IDX_patronbusqueda_contactos');
            $table->string('patronbusqueda',255)->nullable();
            $table->unsignedBigInteger('id_estado')->default(1);
            $table->index('id_estado','IDX_id_estado_contactos');
            $table->foreign('id_estado','FK_id_estado_contactos')
            ->references('id')->on('contactoestados')
            ->onDelete('cascade');
            $table->boolean('sn_activo')->default(1);
            $table->unsignedBigInteger('id_user_created_at')->nullable();
            $table->unsignedBigInteger('id_user_updated_at')->nullable();
            $table->index('id_user_created_at','IDX_id_user_created_at_contactos');
            $table->foreign('id_user_created_at','FK_id_user_created_at')
            ->references('id')->on('users')->onDelete('cascade')
            ->default(1);
            $table->index('id_user_updated_at','IDX_id_user_updated_at_contactos');
            $table->foreign('id_user_updated_at','FK_id_user_updated_at_contactos')
            ->references('id')->on('users')->onDelete('cascade')
            ->default(1); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contactos');
    }
};
