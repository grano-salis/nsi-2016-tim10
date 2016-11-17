namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.SJEDNICA")]
    public partial class SJEDNICA
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SJEDNICA()
        {
            DNEVNI_RED = new HashSet<DNEVNI_RED>();
            SJEDNICA1 = new HashSet<SJEDNICA>();
            UCESNIKs = new HashSet<UCESNIK>();
            ZAPISNIKs = new HashSet<ZAPISNIK>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public DateTime DATUM_ODRZAVANJA_OD { get; set; }

        public DateTime? DATUM_ODRZAVANJA_DO { get; set; }

        [Required]
        [StringLength(50)]
        public string NAZIV { get; set; }

        public decimal? DNEVNI_RED_ID { get; set; }

        [StringLength(15)]
        public string SALA { get; set; }

        public decimal STATUS_SJEDNICE_ID { get; set; }

        public decimal? ZAPISNIK_ID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DNEVNI_RED> DNEVNI_RED { get; set; }

        public virtual ZAPISNIK ZAPISNIK { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SJEDNICA> SJEDNICA1 { get; set; }

        public virtual SJEDNICA SJEDNICA2 { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UCESNIK> UCESNIKs { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ZAPISNIK> ZAPISNIKs { get; set; }
    }
}
