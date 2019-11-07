import { observable } from 'mobx';
import {
    VariantAnnotationSummary,
    remoteData,
    MyVariantInfo,
    VariantAnnotation,
} from 'cbioportal-frontend-commons';
import { genomeNexusClient } from './genomeNexusClientInstance';

import MobxPromise from 'mobxpromise';

export interface VariantStoreConfig {
    variant: string;
}
export class VariantStore {
    constructor(public variantId: string) {
        this.variant = variantId;
    }

    @observable public allResources: string[] = [
        'Cancer Hotspots',
        'OncoKB',
        'COSMIC',
        'cBioPortal',
        'Mutation Assessor',
        'CIViC',
        'PMKB',
        'SIFT',
        'Polyphen-2',
        'UniProt',
        'PFAM',
        'PDB',
        'ProSite',
        'PhosphoSitePlus',
        'PTM',
        'External Links',
    ];
    @observable public selectedResources: string[] = this.allResources;
    @observable public variant: string = '';

    readonly annotation = remoteData<VariantAnnotation>({
        invoke: async () => {
            return await genomeNexusClient.fetchVariantAnnotationGET({
                variant: this.variant,
                fields: ["annotation_summary","my_variant_info"],
            });
        },
        onError: (err: Error) => {
            // fail silently
        },
    });

    // readonly myVariantInfo: MobxPromise<MyVariantInfo> = remoteData({
    //     invoke: async () => {
    //         return await genomeNexusClientInternal.fetchMyVariantInfoAnnotationGET({
    //             variant: this.variant,
    //         });
    //     },
    //     onError: () => {
    //         // fail silently, leave the error handling responsibility to the data consumer
    //     },
    // });

//     readonly variantAnnotation = remoteData<VariantAnnotation>({
//         invoke: async () => {
//             return await genomeNexusClient.fetchVariantAnnotationByIdGET({
//                 variantId: this.variant,
//             });
//         },
//         onError: () => {
//             // fail silently, leave the error handling responsibility to the data consumer
//         },
//     });
}
