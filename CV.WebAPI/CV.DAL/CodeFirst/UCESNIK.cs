namespace CV.DAL.CodeFirst
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NSI09.UCESNIK")]
    public partial class UCESNIK
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UCESNIK()
        {
            CHAT_PORUKA = new HashSet<CHAT_PORUKA>();
            GLAS = new HashSet<GLA>();
            ZAPISNIKs = new HashSet<ZAPISNIK>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ID { get; set; }

        public decimal? UPOSLENIK_ID { get; set; }

        public decimal? SJEDNICA_ID { get; set; }

        public decimal TIP_UCESNIKA_ID { get; set; }

        public decimal STATUS_UCESNIKA_ID { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CHAT_PORUKA> CHAT_PORUKA { get; set; }

        public virtual CV_USER CV_USER { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GLA> GLAS { get; set; }

        public virtual SJEDNICA SJEDNICA { get; set; }

        public virtual STATUS_UCESNIKA STATUS_UCESNIKA { get; set; }

        public virtual TIP_UCESNIKA TIP_UCESNIKA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ZAPISNIK> ZAPISNIKs { get; set; }
    }
}
