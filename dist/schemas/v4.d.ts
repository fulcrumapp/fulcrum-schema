export default Schema;
declare namespace Schema {
    const systemFormTableColumns: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemValuesTableColumns: ({
        name: string;
        type: string;
        allowNull?: undefined;
        length?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        length?: undefined;
    } | {
        name: string;
        type: string;
        length: number;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        length: number;
    })[];
    const systemRepeatableTableColumns: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemChangesetsTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemFormsTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
        defaultValue?: undefined;
        defaultValues?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        defaultValue?: undefined;
        defaultValues?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        defaultValue: number;
        defaultValues?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        defaultValues: boolean;
        defaultValue?: undefined;
    })[];
    const systemChoiceListsTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemClassificationSetsTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemProjectsTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemRolesTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
        defaultValue: boolean;
    })[];
    const systemMembershipsTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemPhotosTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemVideosTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemAudioTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemSignaturesTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemRecordLinksTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    const systemRecordSeriesTable: ({
        name: string;
        type: string;
        allowNull?: undefined;
    } | {
        name: string;
        type: string;
        allowNull: boolean;
    })[];
    namespace systemFormViewColumns {
        const record_resource_id: string;
        const record_key: string;
        const record_sequence: string;
        const project_resource_id: string;
        const assigned_to_resource_id: string;
        const status: string;
        const latitude: string;
        const longitude: string;
        const created_at: string;
        const updated_at: string;
        const version: string;
        const created_by_resource_id: string;
        const updated_by_resource_id: string;
        const server_created_at: string;
        const server_updated_at: string;
        const geometry: string;
        const altitude: string;
        const speed: string;
        const course: string;
        const horizontal_accuracy: string;
        const vertical_accuracy: string;
        const changeset_resource_id: string;
        const title: string;
        const created_latitude: string;
        const created_longitude: string;
        const created_geometry: string;
        const created_altitude: string;
        const created_horizontal_accuracy: string;
        const updated_latitude: string;
        const updated_longitude: string;
        const updated_geometry: string;
        const updated_altitude: string;
        const updated_horizontal_accuracy: string;
        const created_duration: string;
        const updated_duration: string;
        const edited_duration: string;
        const record_series_resource_id: string;
    }
    const systemFormFullViewColumns: any;
    namespace systemRepeatableViewColumns {
        export const resource_id: string;
        const record_resource_id_1: string;
        export { record_resource_id_1 as record_resource_id };
        export const parent_resource_id: string;
        export const record_project_resource_id: string;
        export const record_assigned_to_resource_id: string;
        export const record_status: string;
        export const index: string;
        const latitude_1: string;
        export { latitude_1 as latitude };
        const longitude_1: string;
        export { longitude_1 as longitude };
        const created_at_1: string;
        export { created_at_1 as created_at };
        const updated_at_1: string;
        export { updated_at_1 as updated_at };
        const version_1: string;
        export { version_1 as version };
        const created_by_resource_id_1: string;
        export { created_by_resource_id_1 as created_by_resource_id };
        const updated_by_resource_id_1: string;
        export { updated_by_resource_id_1 as updated_by_resource_id };
        const server_created_at_1: string;
        export { server_created_at_1 as server_created_at };
        const server_updated_at_1: string;
        export { server_updated_at_1 as server_updated_at };
        const geometry_1: string;
        export { geometry_1 as geometry };
        const changeset_resource_id_1: string;
        export { changeset_resource_id_1 as changeset_resource_id };
        const title_1: string;
        export { title_1 as title };
        const created_latitude_1: string;
        export { created_latitude_1 as created_latitude };
        const created_longitude_1: string;
        export { created_longitude_1 as created_longitude };
        const created_geometry_1: string;
        export { created_geometry_1 as created_geometry };
        const created_altitude_1: string;
        export { created_altitude_1 as created_altitude };
        const created_horizontal_accuracy_1: string;
        export { created_horizontal_accuracy_1 as created_horizontal_accuracy };
        const updated_latitude_1: string;
        export { updated_latitude_1 as updated_latitude };
        const updated_longitude_1: string;
        export { updated_longitude_1 as updated_longitude };
        const updated_geometry_1: string;
        export { updated_geometry_1 as updated_geometry };
        const updated_altitude_1: string;
        export { updated_altitude_1 as updated_altitude };
        const updated_horizontal_accuracy_1: string;
        export { updated_horizontal_accuracy_1 as updated_horizontal_accuracy };
        const created_duration_1: string;
        export { created_duration_1 as created_duration };
        const updated_duration_1: string;
        export { updated_duration_1 as updated_duration };
        const edited_duration_1: string;
        export { edited_duration_1 as edited_duration };
    }
    const systemRepeatableFullViewColumns: any;
    namespace systemValuesViewColumns {
        const record_resource_id_2: string;
        export { record_resource_id_2 as record_resource_id };
        const parent_resource_id_1: string;
        export { parent_resource_id_1 as parent_resource_id };
        export const key: string;
        export const text_value: string;
    }
    namespace organizationViews {
        namespace changesets {
            export const row_resource_id: string;
            export const form_resource_id: string;
            export const metadata: string;
            export const metadata_index: string;
            export const closed_at: string;
            const created_by_resource_id_2: string;
            export { created_by_resource_id_2 as created_by_resource_id };
            const updated_by_resource_id_2: string;
            export { updated_by_resource_id_2 as updated_by_resource_id };
            export const closed_by_resource_id: string;
            const created_at_2: string;
            export { created_at_2 as created_at };
            const updated_at_2: string;
            export { updated_at_2 as updated_at };
            export const min_lat: string;
            export const max_lat: string;
            export const min_lon: string;
            export const max_lon: string;
            export const number_of_changes: string;
            export const number_of_creates: string;
            export const number_of_updates: string;
            export const number_of_deletes: string;
        }
        namespace forms {
            const row_resource_id_1: string;
            export { row_resource_id_1 as row_resource_id };
            export const name: string;
            export const description: string;
            const version_2: string;
            export { version_2 as version };
            export const elements: string;
            export const bounding_box: string;
            const status_1: string;
            export { status_1 as status };
            export const status_field: string;
            const created_by_resource_id_3: string;
            export { created_by_resource_id_3 as created_by_resource_id };
            const updated_by_resource_id_3: string;
            export { updated_by_resource_id_3 as updated_by_resource_id };
            const created_at_3: string;
            export { created_at_3 as created_at };
            const updated_at_3: string;
            export { updated_at_3 as updated_at };
            export const auto_assign: string;
            export const title_field_keys: string;
            export const hidden_on_dashboard: string;
            export const geometry_types: string;
            export const geometry_required: string;
            export const script: string;
            export const projects_enabled: string;
            export const assignment_enabled: string;
            export const image: string;
            export const system_type: string;
        }
        namespace choice_lists {
            const row_resource_id_2: string;
            export { row_resource_id_2 as row_resource_id };
            const name_1: string;
            export { name_1 as name };
            const description_1: string;
            export { description_1 as description };
            const version_3: string;
            export { version_3 as version };
            export const items: string;
            const created_by_resource_id_4: string;
            export { created_by_resource_id_4 as created_by_resource_id };
            const updated_by_resource_id_4: string;
            export { updated_by_resource_id_4 as updated_by_resource_id };
            const created_at_4: string;
            export { created_at_4 as created_at };
            const updated_at_4: string;
            export { updated_at_4 as updated_at };
        }
        namespace classification_sets {
            const row_resource_id_3: string;
            export { row_resource_id_3 as row_resource_id };
            const name_2: string;
            export { name_2 as name };
            const description_2: string;
            export { description_2 as description };
            const version_4: string;
            export { version_4 as version };
            const items_1: string;
            export { items_1 as items };
            const created_by_resource_id_5: string;
            export { created_by_resource_id_5 as created_by_resource_id };
            const updated_by_resource_id_5: string;
            export { updated_by_resource_id_5 as updated_by_resource_id };
            const created_at_5: string;
            export { created_at_5 as created_at };
            const updated_at_5: string;
            export { updated_at_5 as updated_at };
            const system_type_1: string;
            export { system_type_1 as system_type };
        }
        namespace projects {
            const row_resource_id_4: string;
            export { row_resource_id_4 as row_resource_id };
            const name_3: string;
            export { name_3 as name };
            const description_3: string;
            export { description_3 as description };
            const created_by_resource_id_6: string;
            export { created_by_resource_id_6 as created_by_resource_id };
            const created_at_6: string;
            export { created_at_6 as created_at };
            const updated_at_6: string;
            export { updated_at_6 as updated_at };
        }
        namespace roles {
            const row_resource_id_5: string;
            export { row_resource_id_5 as row_resource_id };
            const name_4: string;
            export { name_4 as name };
            const description_4: string;
            export { description_4 as description };
            const created_by_resource_id_7: string;
            export { created_by_resource_id_7 as created_by_resource_id };
            const updated_by_resource_id_6: string;
            export { updated_by_resource_id_6 as updated_by_resource_id };
            const created_at_7: string;
            export { created_at_7 as created_at };
            const updated_at_7: string;
            export { updated_at_7 as updated_at };
            export const is_system: string;
            export const is_default: string;
            export const can_manage_subscription: string;
            export const can_update_organization: string;
            export const can_manage_members: string;
            export const can_manage_roles: string;
            export const can_manage_apps: string;
            export const can_manage_projects: string;
            export const can_manage_choice_lists: string;
            export const can_manage_classification_sets: string;
            export const can_create_records: string;
            export const can_update_records: string;
            export const can_delete_records: string;
            export const can_change_status: string;
            export const can_change_project: string;
            export const can_assign_records: string;
            export const can_import_records: string;
            export const can_export_records: string;
            export const can_run_reports: string;
            export const can_manage_authorizations: string;
        }
        namespace memberships {
            const row_resource_id_6: string;
            export { row_resource_id_6 as row_resource_id };
            export const user_resource_id: string;
            export const first_name: string;
            export const last_name: string;
            const name_5: string;
            export { name_5 as name };
            export const email: string;
            export const role_resource_id: string;
            export const role_name: string;
            const status_2: string;
            export { status_2 as status };
            const created_at_8: string;
            export { created_at_8 as created_at };
            const updated_at_8: string;
            export { updated_at_8 as updated_at };
        }
        namespace photos {
            export const access_key: string;
            export const exif: string;
            export const file_size: string;
            const record_resource_id_3: string;
            export { record_resource_id_3 as record_resource_id };
            const form_resource_id_1: string;
            export { form_resource_id_1 as form_resource_id };
            const created_by_resource_id_8: string;
            export { created_by_resource_id_8 as created_by_resource_id };
            const updated_by_resource_id_7: string;
            export { updated_by_resource_id_7 as updated_by_resource_id };
            const created_at_9: string;
            export { created_at_9 as created_at };
            const updated_at_9: string;
            export { updated_at_9 as updated_at };
            export const file: string;
            export const content_type: string;
            export const uploaded_at: string;
            export const stored_at: string;
            export const processed_at: string;
            const geometry_2: string;
            export { geometry_2 as geometry };
            const latitude_2: string;
            export { latitude_2 as latitude };
            const longitude_2: string;
            export { longitude_2 as longitude };
            export const accuracy: string;
            const altitude_1: string;
            export { altitude_1 as altitude };
            export const direction: string;
            export const width: string;
            export const height: string;
            export const make: string;
            export const model: string;
            export const software: string;
            export const deleted_at: string;
        }
        namespace videos {
            const access_key_1: string;
            export { access_key_1 as access_key };
            const metadata_1: string;
            export { metadata_1 as metadata };
            const file_size_1: string;
            export { file_size_1 as file_size };
            const record_resource_id_4: string;
            export { record_resource_id_4 as record_resource_id };
            const form_resource_id_2: string;
            export { form_resource_id_2 as form_resource_id };
            const created_by_resource_id_9: string;
            export { created_by_resource_id_9 as created_by_resource_id };
            const updated_by_resource_id_8: string;
            export { updated_by_resource_id_8 as updated_by_resource_id };
            const created_at_10: string;
            export { created_at_10 as created_at };
            const updated_at_10: string;
            export { updated_at_10 as updated_at };
            const file_1: string;
            export { file_1 as file };
            const content_type_1: string;
            export { content_type_1 as content_type };
            const uploaded_at_1: string;
            export { uploaded_at_1 as uploaded_at };
            const stored_at_1: string;
            export { stored_at_1 as stored_at };
            const processed_at_1: string;
            export { processed_at_1 as processed_at };
            export const has_track: string;
            export const track: string;
            const geometry_3: string;
            export { geometry_3 as geometry };
            const width_1: string;
            export { width_1 as width };
            const height_1: string;
            export { height_1 as height };
            export const duration: string;
            const deleted_at_1: string;
            export { deleted_at_1 as deleted_at };
        }
        namespace audio {
            const access_key_2: string;
            export { access_key_2 as access_key };
            const metadata_2: string;
            export { metadata_2 as metadata };
            const file_size_2: string;
            export { file_size_2 as file_size };
            const record_resource_id_5: string;
            export { record_resource_id_5 as record_resource_id };
            const form_resource_id_3: string;
            export { form_resource_id_3 as form_resource_id };
            const created_by_resource_id_10: string;
            export { created_by_resource_id_10 as created_by_resource_id };
            const updated_by_resource_id_9: string;
            export { updated_by_resource_id_9 as updated_by_resource_id };
            const created_at_11: string;
            export { created_at_11 as created_at };
            const updated_at_11: string;
            export { updated_at_11 as updated_at };
            const file_2: string;
            export { file_2 as file };
            const content_type_2: string;
            export { content_type_2 as content_type };
            const uploaded_at_2: string;
            export { uploaded_at_2 as uploaded_at };
            const stored_at_2: string;
            export { stored_at_2 as stored_at };
            const processed_at_2: string;
            export { processed_at_2 as processed_at };
            const has_track_1: string;
            export { has_track_1 as has_track };
            const track_1: string;
            export { track_1 as track };
            const geometry_4: string;
            export { geometry_4 as geometry };
            const duration_1: string;
            export { duration_1 as duration };
            const deleted_at_2: string;
            export { deleted_at_2 as deleted_at };
        }
        const signatures: {
            access_key: string;
            file_size: string;
            record_resource_id: string;
            form_resource_id: string;
            created_by_resource_id: string;
            updated_by_resource_id: string;
            created_at: string;
            updated_at: string;
            file: string;
            content_type: string;
            uploaded_at: string;
            stored_at: string;
            processed_at: string;
            deleted_at: string;
        } | {
            access_key: string;
            file_size: string;
            record_resource_id: string;
            form_resource_id: string;
            created_by_resource_id: string;
            updated_by_resource_id: string;
            created_at: string;
            updated_at: string;
            file: string;
            content_type: string;
            uploaded_at: string;
            stored_at: string;
            processed_at: string;
            deleted_at: string;
        };
        namespace record_series {
            const row_resource_id_7: string;
            export { row_resource_id_7 as row_resource_id };
            export const enabled: string;
            export const rrule: string;
            export const template: string;
            const form_resource_id_4: string;
            export { form_resource_id_4 as form_resource_id };
            const assigned_to_resource_id_1: string;
            export { assigned_to_resource_id_1 as assigned_to_resource_id };
            const project_resource_id_1: string;
            export { project_resource_id_1 as project_resource_id };
            const created_by_resource_id_11: string;
            export { created_by_resource_id_11 as created_by_resource_id };
            const updated_by_resource_id_10: string;
            export { updated_by_resource_id_10 as updated_by_resource_id };
            const created_at_12: string;
            export { created_at_12 as created_at };
            const updated_at_12: string;
            export { updated_at_12 as updated_at };
        }
    }
    namespace organizationIndexes {
        const changesets_1: ({
            columns: string[];
            unique: boolean;
            method?: undefined;
        } | {
            columns: string[];
            unique?: undefined;
            method?: undefined;
        } | {
            columns: string[];
            method: string;
            unique?: undefined;
        })[];
        export { changesets_1 as changesets };
        const forms_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { forms_1 as forms };
        const choice_lists_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { choice_lists_1 as choice_lists };
        const classification_sets_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { classification_sets_1 as classification_sets };
        const projects_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { projects_1 as projects };
        const roles_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { roles_1 as roles };
        const memberships_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { memberships_1 as memberships };
        const photos_1: ({
            columns: string[];
            unique: boolean;
            method?: undefined;
        } | {
            columns: string[];
            unique?: undefined;
            method?: undefined;
        } | {
            columns: string[];
            method: string;
            unique?: undefined;
        })[];
        export { photos_1 as photos };
        const videos_1: ({
            columns: string[];
            unique: boolean;
            method?: undefined;
        } | {
            columns: string[];
            unique?: undefined;
            method?: undefined;
        } | {
            columns: string[];
            method: string;
            unique?: undefined;
        })[];
        export { videos_1 as videos };
        const audio_1: ({
            columns: string[];
            unique: boolean;
            method?: undefined;
        } | {
            columns: string[];
            unique?: undefined;
            method?: undefined;
        } | {
            columns: string[];
            method: string;
            unique?: undefined;
        })[];
        export { audio_1 as audio };
        const signatures_1: ({
            columns: string[];
            unique: boolean;
        } | {
            columns: string[];
            unique?: undefined;
        })[];
        export { signatures_1 as signatures };
        const record_series_1: {
            columns: string[];
            unique: boolean;
        }[];
        export { record_series_1 as record_series };
    }
    const systemFormTableIndexes: ({
        columns: string[];
        method: string;
        unique: boolean;
        predicate?: undefined;
    } | {
        columns: string[];
        method: string;
        unique?: undefined;
        predicate?: undefined;
    } | {
        columns: string[];
        method: string;
        predicate: string;
        unique?: undefined;
    })[];
    const systemRepeatableTableIndexes: ({
        columns: string[];
        method: string;
        unique: boolean;
    } | {
        columns: string[];
        method: string;
        unique?: undefined;
    })[];
    const systemValuesTableIndexes: {
        columns: string[];
        method: string;
    }[];
}
