namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.STAVKA_DNEVNOG_REDA")]
    public partial class STAVKA_DNEVNOG_REDA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public STAVKA_DNEVNOG_REDA()
        {
            GLAS = new HashSet<GLA>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public decimal DNEVNI_RED_ID { get; set; }

        public decimal REDNI_BROJ { get; set; }

        [Required]
        [StringLength(20)]
        public string NASLOV { get; set; }

        [Required]
        [StringLength(300)]
        public string OPIS { get; set; }

        public decimal STATUS_STAVKE_DR_ID { get; set; }

        public virtual DNEVNI_RED DNEVNI_RED { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GLA> GLAS { get; set; }

        public virtual STATUS_STAVKE_DNEVNOG_REDA STATUS_STAVKE_DNEVNOG_REDA { get; set; }
    }
}
