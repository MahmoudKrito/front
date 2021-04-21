<template>
        <div id="preLoader">
            <div class="preLoader-content">
                <img src="../assets/images/Group83.svg" alt="">
                <ul class="face-reactions">
                    <li>
                        <img src="../assets/images/face-circle.svg" alt="">
                        <img src="../assets/images/face-1.svg" alt="">
                    </li>
                    <li>
                        <img src="../assets/images/face-circle.svg" alt="">
                        <img src="../assets/images/face-2.svg" alt="">
                    </li>
                    <li>
                        <img src="../assets/images/face-circle.svg" alt="">
                        <img src="../assets/images/face-3.svg" alt="">
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>

    import $ from 'jquery'

    export default {
        mounted() {
            //Preloader
            // makes sure the whole site is loaded
            function hidePreloader() {
                $('.preLoader-content').fadeOut(2000);
                $('#preLoader').delay(2000).fadeOut('slow');
            }

            hidePreloader();

        }
    }
</script>